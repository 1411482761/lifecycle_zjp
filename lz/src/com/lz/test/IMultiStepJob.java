package com.lz.test;
    
public interface IMultiStepJob {    
    public boolean runNextStep();    
    
    String getName();    
    
    public void cleanUp();    
}    