---
title: "Reserved Words in Java"
date: 2025-09-20
author: "Rajesh Bhola"
categories: ["Java"]
tags: ["reserved words", "keywords", "reserved literals"]
summary: "Learn all Java reserved words (keywords) with practical examples. Understand data types, flow control, access modifiers, and exception handling keywords in Java programming."
draft: false
---


## **What Are Reserved Words?**

Reserved words are predefined identifiers in Java that have special meanings and cannot be used for naming variables, methods, classes, or any other user-defined elements. Java has 53 reserved words total.

```java
// These won't compile - using reserved words as identifiers
// int class = 10;      // Error: 'class' is reserved
// String if = "test";  // Error: 'if' is reserved
// boolean void = true; // Error: 'void' is reserved

// Correct usage
int classSize = 10;
String ifCondition = "test";  
boolean voidCheck = true;
```

## **Categories of Reserved Words**

### **1. Data Type Keywords (8)**

These keywords define primitive data types in Java.

```java
public class DataTypeKeywords {
    // The 8 primitive data type keywords
    byte smallNumber = 127;           // 8-bit integer
    short mediumNumber = 32000;       // 16-bit integer  
    int regularNumber = 100000;       // 32-bit integer
    long bigNumber = 100000000L;      // 64-bit integer
    
    float decimalNumber = 3.14f;      // 32-bit floating point
    double preciseDecimal = 3.14159;  // 64-bit floating point
    
    char letter = 'A';                // 16-bit Unicode character
    boolean flag = true;              // true or false only
    
    public void demonstrateRanges() {
        // byte: -128 to 127
        byte minByte = -128;
        byte maxByte = 127;
        
        // short: -32,768 to 32,767  
        short minShort = -32768;
        short maxShort = 32767;
        
        // int: -2,147,483,648 to 2,147,483,647
        int minInt = Integer.MIN_VALUE;
        int maxInt = Integer.MAX_VALUE;
        
        // long: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
        long minLong = Long.MIN_VALUE;
        long maxLong = Long.MAX_VALUE;
    }
}
```

### **2. Flow Control Keywords (11)**

These keywords control the execution flow of your program.

```java
public class FlowControlKeywords {
    
    public void demonstrateIfElse(int score) {
        // if-else keywords
        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else {
            System.out.println("Grade: C");
        }
    }
    
    public void demonstrateSwitch(int day) {
        // switch-case-default keywords
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;  // break keyword
            case 2:
                System.out.println("Tuesday");
                break;
            default:  // default keyword
                System.out.println("Other day");
        }
    }
    
    public void demonstrateLoops() {
        // for loop
        for (int i = 0; i < 5; i++) {
            if (i == 2) {
                continue;  // continue keyword - skip iteration
            }
            if (i == 4) {
                break;     // break keyword - exit loop
            }
            System.out.println(i);
        }
        
        // while loop
        int count = 0;
        while (count < 3) {
            System.out.println("Count: " + count);
            count++;
        }
        
        // do-while loop
        int num = 0;
        do {
            System.out.println("Number: " + num);
            num++;
        } while (num < 3);
    }
    
    public int calculateSum(int a, int b) {
        return a + b;  // return keyword
    }
}
```

### **3. Access Modifiers Keywords (11)**

These keywords control visibility and behavior of classes, methods, and variables.

```java
public class ModifierKeywords {
    
    // Access level modifiers
    public String publicField = "Accessible everywhere";
    protected String protectedField = "Accessible in package and subclasses";
    private String privateField = "Accessible only in this class";
    String defaultField = "Package-private (no modifier)";
    
    // Non-access modifiers
    static int staticVariable = 100;        // Class-level variable
    final double PI = 3.14159;              // Constant - cannot be changed
    volatile int counter = 0;               // Thread-visible variable
    transient String tempData = "Not serialized";  // Skip during serialization
    
    // Method modifiers
    public static void staticMethod() {
        System.out.println("Static method");
    }
    
    public final void finalMethod() {
        // Cannot be overridden in subclasses
    }
    
    public synchronized void threadSafeMethod() {
        // Only one thread can execute at a time
    }
    
    public strictfp double preciseCalculation() {
        // Ensures platform-independent floating-point calculations
        return 0.1 + 0.2;
    }
    
    public native void nativeMethod();  // Implemented in another language (C/C++)
}

// Abstract class demonstration
abstract class Shape {
    abstract void draw();  // Abstract method - no implementation
    
    void display() {
        System.out.println("Displaying shape");
    }
}
```

### **4. Exception Handling Keywords (6)**

These keywords manage exceptions and errors in your program.

```java
public class ExceptionKeywords {
    
    public void demonstrateTryCatch() {
        try {
            // Code that might throw exception
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            // Handle specific exception
            System.out.println("Cannot divide by zero");
        } finally {
            // Always executed
            System.out.println("Cleanup code");
        }
    }
    
    // Method that declares it might throw an exception
    public void riskyMethod() throws IOException {
        if (Math.random() > 0.5) {
            throw new IOException("Random error");  // throw keyword
        }
    }
    
    public void demonstrateAssert(int age) {
        // assert keyword - for debugging (needs -ea JVM flag)
        assert age >= 0 : "Age cannot be negative";
        System.out.println("Age: " + age);
    }
}
```

### **5. Class-Related Keywords (6)**

These keywords are used for defining and working with classes.

```java
// class keyword - defines a class
class Animal {
    String name;
}

// extends keyword - inheritance
class Dog extends Animal {
    void bark() {
        System.out.println("Woof!");
    }
}

// interface keyword - defines an interface
interface Drawable {
    void draw();
}

// implements keyword - implementing interface
class Circle implements Drawable {
    public void draw() {
        System.out.println("Drawing circle");
    }
}

// package keyword - declares package (must be first line)
package com.example.demo;

// import keyword - imports classes
import java.util.ArrayList;
import java.util.*;  // Import all classes from package
```

### **6. Object-Related Keywords (4)**

These keywords work with objects and references.

```java
public class ObjectKeywords {
    
    public void demonstrateObjectKeywords() {
        // new keyword - creates objects
        String str = new String("Hello");
        ArrayList<Integer> list = new ArrayList<>();
        
        // instanceof keyword - checks object type
        if (str instanceof String) {
            System.out.println("str is a String");
        }
        
        // this keyword - refers to current object
        class Person {
            String name;
            
            Person(String name) {
                this.name = name;  // Distinguishes field from parameter
            }
            
            void display() {
                System.out.println(this.name);
            }
        }
        
        // super keyword - refers to parent class
        class Employee extends Person {
            double salary;
            
            Employee(String name, double salary) {
                super(name);  // Call parent constructor
                this.salary = salary;
            }
            
            void display() {
                super.display();  // Call parent method
                System.out.println("Salary: " + salary);
            }
        }
    }
}
```

### **7. Void Return Type Keyword (1)**

The `void` keyword indicates a method returns nothing.

```java
public class VoidKeyword {
    
    // void method - no return value
    public void printMessage() {
        System.out.println("This method returns nothing");
        // return;  // Optional - exits method early
    }
    
    // Non-void method - must return a value
    public int getValue() {
        return 42;  // Required return statement
    }
    
    // Void is mandatory in Java (unlike C++)
    // public printError() { }  // Error: invalid method declaration
}
```

### **8. Unused Keywords (2)**

These keywords are reserved but not used in Java.

```java
public class UnusedKeywords {
    // goto - Reserved but not used (considered harmful)
    // goto label;  // Compile error: not a statement
    
    // const - Reserved but not used (use 'final' instead)
    // const int VALUE = 10;  // Error: illegal start of expression
    
    // Correct way
    final int VALUE = 10;  // Use final for constants
}
```

### **9. Reserved Literals (3)**

These are reserved literal values, not keywords.

```java
public class ReservedLiterals {
    
    // true and false - boolean literals
    boolean isActive = true;
    boolean isComplete = false;
    
    // null - reference literal
    String str = null;         // No object reference
    Object obj = null;        // Can be assigned to any reference type
    
    // These cannot be used as identifiers
    // int true = 1;      // Error: not a statement
    // int false = 0;     // Error: not a statement  
    // int null = -1;     // Error: not a statement
    
    public void checkNull(String text) {
        if (text == null) {
            System.out.println("Text is null");
        } else {
            System.out.println("Text: " + text);
        }
    }
}
```

### **10. Special Keyword: enum (Added in Java 5)**

The `enum` keyword defines enumerated types.

```java
// enum keyword - defines enumeration
public enum DayOfWeek {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

public class EnumExample {
    public void demonstrateEnum() {
        DayOfWeek today = DayOfWeek.MONDAY;
        
        // Switch with enum
        switch (today) {
            case MONDAY:
                System.out.println("Start of work week");
                break;
            case FRIDAY:
                System.out.println("TGIF!");
                break;
            default:
                System.out.println("Regular day");
        }
        
        // Iterate through all enum values
        for (DayOfWeek day : DayOfWeek.values()) {
            System.out.println(day);
        }
    }
}
```

## **Important Facts About Reserved Words**

```java
public class ReservedWordsFacts {
    
    // Fact 1: All keywords are lowercase
    public static void main(String[] args) {
        // int Int = 10;     // Valid - not a keyword
        // int INT = 20;     // Valid - not a keyword
        // int int = 30;     // Invalid - reserved keyword
        
        // Fact 2: Cannot use reserved words even with different case
        // int iF = 10;      // Valid - 'iF' is not 'if'
        // int IF = 20;      // Valid - 'IF' is not 'if'  
        // int if = 30;      // Invalid - exact match
        
        // Fact 3: true, false, null are literals, not keywords
        // But still cannot be used as identifiers
        
        // Fact 4: Some words look like they should be keywords but aren't
        int main = 100;        // Valid - main is not a keyword
        int String = 200;      // Valid - String is a class, not keyword
        int System = 300;      // Valid - System is a class, not keyword
    }
}
```

## **Complete List Summary**

| Category | Count | Keywords |
|----------|-------|----------|
| Data Types | 8 | `byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean` |
| Flow Control | 11 | `if`, `else`, `switch`, `case`, `default`, `for`, `do`, `while`, `break`, `continue`, `return` |
| Modifiers | 11 | `public`, `private`, `protected`, `static`, `final`, `abstract`, `synchronized`, `native`, `strictfp`, `transient`, `volatile` |
| Exception Handling | 6 | `try`, `catch`, `finally`, `throw`, `throws`, `assert` |
| Class Related | 6 | `class`, `interface`, `extends`, `implements`, `package`, `import` |
| Object Related | 4 | `new`, `instanceof`, `this`, `super` |
| Return Type | 1 | `void` |
| Unused | 2 | `goto`, `const` |
| Literals | 3 | `true`, `false`, `null` |
| Enum | 1 | `enum` |
| **Total** | **53** | |

Reserved words are the building blocks of Java syntax. Understanding their proper usage is essential for writing valid Java code. Remember: all keywords are lowercase, and you cannot use any of these 53 words as identifiers in your programs.

Understanding reserved words is fundamental to writing valid Java code. These keywords form the syntax of the language and cannot be used as identifiers. By mastering these reserved words and their proper usage, you'll be able to write clear, efficient, and error-free Java programs. Always refer to this list when choosing names for your variables, classes, and methods to avoid naming conflicts.