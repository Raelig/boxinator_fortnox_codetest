package com.boxinator.backend_boxinator.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.DecimalFormat;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Box {

    private static final DecimalFormat df = new DecimalFormat("0.00");

    private long id;
    private String boxName;
    private int boxWeight;
    private String boxColour;
    private String boxCountry;
    private double shippingCost;

    public Box (String boxName, int boxWeight, String boxColour, String boxCountry) {
        this.boxName = boxName;
        this.boxWeight = boxWeight;
        this.boxColour = boxColour;
        this.boxCountry = boxCountry;
    }

    public void setShippingCost() {
        if (boxCountry.equals("SWEDEN")) {
            this.shippingCost = boxWeight * 1.3;
        } else if (boxCountry.equals("CHINA")) {
            this.shippingCost = boxWeight * 4;
        } else if (boxCountry.equals("BRAZIL")) {
            this.shippingCost = boxWeight * 8.6;
        } else if (boxCountry.equals("AUSTRALIA")) {
            this.shippingCost = boxWeight * 7.2;
        }
    }
}
