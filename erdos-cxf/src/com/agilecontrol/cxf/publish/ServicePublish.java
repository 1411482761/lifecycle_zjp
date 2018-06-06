package com.agilecontrol.cxf.publish;

import com.agilecontrol.cxf.IColorSize;
import com.agilecontrol.cxf.impl.ColorSizeImpl;
import com.agilecontrol.cxf.interceptor.AuthInterceptor;
import org.apache.cxf.Bus;
import org.apache.cxf.BusFactory;
import org.apache.cxf.frontend.ServerFactoryBean;
import org.apache.cxf.transport.servlet.CXFNonSpringServlet;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;

public class ServicePublish extends CXFNonSpringServlet {

    @Override
    public void loadBus(ServletConfig servletConfig) throws ServletException {
        super.loadBus(servletConfig);

        Bus bus = getBus();
        BusFactory.setDefaultBus(bus);
        ColorSizeImpl colorSize = new ColorSizeImpl();

        ServerFactoryBean sfb = new ServerFactoryBean();
        sfb.setServiceBean(IColorSize.class);
        sfb.setAddress("/colorSize");
        sfb.setServiceBean(colorSize);
        sfb.getInInterceptors().add(new AuthInterceptor());
        sfb.create();
    }
}
