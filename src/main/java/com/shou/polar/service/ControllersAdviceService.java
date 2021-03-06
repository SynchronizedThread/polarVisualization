package com.shou.polar.service;

import com.shou.polar.component.ComponentsUtils;
import com.shou.polar.pojo.ResNameSpace;
import com.shou.polar.pojo.UpdateEvent;
import org.jboss.logging.Logger;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.beans.propertyeditors.CustomNumberEditor;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
@ControllerAdvice
public class ControllersAdviceService {
    private final Logger logger = Logger.getLogger(ControllersAdviceService.class);
    private final Map<String, List<String>> ERROR_POOL;

    public ControllersAdviceService() {
        ERROR_POOL = Collections.synchronizedMap(new HashMap<>());
    }

    @ExceptionHandler(value = Exception.class)
    public void exception(Exception e, WebRequest request) {
        String sessionId = request.getSessionId();
        ApplicationContext context = ComponentsUtils.getApplicationContext();
        if (!ERROR_POOL.containsKey(sessionId)) {
            ERROR_POOL.put(sessionId, new ArrayList<>());
        }
        ERROR_POOL.get(sessionId).add(e.getMessage());
        logger.error(e.getMessage());
        context.publishEvent(new UpdateEvent(this, ResNameSpace.ERROR.getName()));
    }

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.registerCustomEditor(Long.class, new CustomNumberEditor(Long.class, true));
        binder.registerCustomEditor(Date.class, new CustomDateEditor(new SimpleDateFormat("yyyy-MM-dd"), true));
    }

    public synchronized List<String> getErrors(String sessionId) {
        List<String> cache = new ArrayList<>();
        if (ERROR_POOL.containsKey(sessionId)) {
            List<String> errors = ERROR_POOL.get(sessionId);
            for (String error : errors) {
                if (!cache.contains(error)) {
                    cache.add(error);
                }
            }
            errors.clear();
        }
        return cache;
    }
}
