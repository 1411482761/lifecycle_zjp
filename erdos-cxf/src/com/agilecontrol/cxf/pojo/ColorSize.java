package com.agilecontrol.cxf.pojo;

public class ColorSize {
    private String attribname;
    private String value;
    private String name;
    private String description;
    private int flag;
    private int orderno;


    public String getAttribname() {
        return attribname;
    }
    public void setAttribname(String attribname) {
        this.attribname = attribname;
    }
    public String getValue() {
        return value;
    }
    public void setValue(String value) {
        this.value = value;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public int getFlag() {
        return flag;
    }
    public void setFlag(int flag) {
        this.flag = flag;
    }

    public int getOrderno() {
        return orderno;
    }

    public void setOrderno(int orderno) {
        this.orderno = orderno;
    }
    
    @Override
    public String toString() {
        return "ColorSize [attribname=" + attribname + ", value=" + value + ", name=" + name + ", description="
                + description + ", flag=" + flag + ", orderno="+ orderno +"]";
    }

}
