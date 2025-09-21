---
title: "Memory Areas in JVM"
date: 2025-09-21
author: "Rajesh Bhola"
categories: ["Java"]
tags: ["Memory Areas", "JVM", "heap", "stack", "method"]
summary: "Learn about JVM memory areas including heap, stack, method area, and native method stack. Understand how Java manages memory with practical examples."
draft: false
---


## JVM Memory Areas Overview

The Java Virtual Machine (JVM) divides memory into several areas during program execution. Each area serves a specific purpose and has different behaviors for storing and managing data. Understanding these memory areas is crucial for writing efficient Java programs and diagnosing memory-related issues.

## 1. Method Area (Metaspace in Java 8+)

The Method Area stores class-level data including:
- Class metadata (name, modifiers, superclass info)
- Method bytecode
- Runtime constant pool
- Field and method information
- Static variables

**Example:**
```java
public class MethodAreaDemo {
    // Static variable stored in Method Area
    private static int staticVariable = 100;
    private static final String CONSTANT = "CONSTANT_VALUE";
    
    // Static block executed when class is loaded
    static {
        System.out.println("Static block: Class loading in Method Area");
    }
    
    public static void main(String[] args) {
        // Accessing static data from Method Area
        System.out.println("Static variable: " + staticVariable);
        System.out.println("Constant: " + CONSTANT);
        
        // Class metadata also stored in Method Area
        Class<?> clazz = MethodAreaDemo.class;
        System.out.println("Class name: " + clazz.getName());
    }
}
```

## 2. Heap Memory

The Heap is the runtime data area where all objects and their instance variables are stored. Key characteristics:
- Shared by all threads
- Garbage collected
- Divided into generations (Young, Old, Permanent/Metaspace)

**Example:**
```java
public class HeapMemoryDemo {
    public static void main(String[] args) {
        // Objects created in Heap
        HeapMemoryDemo obj1 = new HeapMemoryDemo();
        HeapMemoryDemo obj2 = new HeapMemoryDemo();
        
        // Arrays created in Heap
        int[] array = new int[1000];
        
        // String objects in Heap (String Pool is part of Heap)
        String str1 = "Hello";  // String pool
        String str2 = new String("Hello");  // Regular heap
        
        System.out.println("Objects created in Heap");
        
        // Making objects eligible for garbage collection
        obj1 = null;
        obj2 = null;
        
        // Suggesting garbage collection
        System.gc();
    }
    
    @Override
    protected void finalize() throws Throwable {
        System.out.println("Object being garbage collected");
    }
}
```

## 3. Stack Memory

Stack memory stores:
- Method invocation frames
- Local variables
- Partial results
- Return values

Each thread has its own private stack. Frames are created when methods are called and destroyed when methods complete.

**Example:**
```java
public class StackMemoryDemo {
    public static void main(String[] args) {
        // main() method frame pushed to stack
        int localVar = 10;  // Stored in main's stack frame
        
        // Method call creates new stack frame
        int result = calculate(localVar, 20);
        System.out.println("Result: " + result);
    }
    
    public static int calculate(int a, int b) {
        // New frame with parameters a, b
        int sum = a + b;  // Local variable in this frame
        return sum;
        // Frame popped after return
    }
    
    // Stack overflow example
    public static void recursiveMethod(int count) {
        System.out.println("Call: " + count);
        recursiveMethod(count + 1);  // Infinite recursion
        // Will cause StackOverflowError
    }
}
```

## 4. Native Method Stack

The Native Method Stack stores:
- Native method information
- Native libraries' data structures
- State for native method calls

**Example:**
```java
public class NativeMethodStackDemo {
    // Declaring native method
    public native void nativeMethod();
    
    // Loading native library
    static {
        System.loadLibrary("NativeLib");
    }
    
    public static void main(String[] args) {
        NativeMethodStackDemo demo = new NativeMethodStackDemo();
        demo.nativeMethod();  // Native method call uses Native Method Stack
    }
}
```

## 5. PC Registers (Program Counter Registers)

Each thread has its own PC Register that stores:
- Address of currently executing JVM instruction
- For native methods, value is undefined

**Example:**
```java
public class PCRegisterDemo {
    public static void main(String[] args) {
        // Each thread has its own PC Register
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("Thread 1: " + i);
            }
        });
        
        Thread thread2 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("Thread 2: " + i);
            }
        });
        
        thread1.start();
        thread2.start();
        
        // Each thread's PC Register tracks its own execution point
    }
}
```

## Memory Area Comparison

| Memory Area | Shared? | Size | Purpose | Garbage Collected? |
|-------------|---------|------|---------|-------------------|
| Method Area | Yes | Fixed at startup | Class metadata | No (except unused classes) |
| Heap | Yes | Configurable | Objects and arrays | Yes |
| Stack | No (per thread) | Thread-dependent | Method frames | No |
| Native Method Stack | No (per thread) | Thread-dependent | Native methods | No |
| PC Registers | No (per thread) | Small | Execution address | No |

## Common Memory Errors

### Stack Overflow Error
Occurs when stack memory is exhausted, typically from infinite recursion:

```java
public class StackOverflowErrorDemo {
    public static void main(String[] args) {
        recursive();  // Will cause StackOverflowError
    }
    
    public static void recursive() {
        recursive();  // Infinite recursion
    }
}
```

### OutOfMemoryError
Occurs when heap memory is exhausted:

```java
import java.util.ArrayList;
import java.util.List;

public class OutOfMemoryErrorDemo {
    public static void main(String[] args) {
        List<byte[]> list = new ArrayList<>();
        while (true) {
            list.add(new byte[1024 * 1024]);  // 1MB each
            // Will eventually cause OutOfMemoryError: Java heap space
        }
    }
}
```

## Conclusion

Understanding JVM memory areas is essential for:
- Writing efficient Java programs
- Diagnosing memory leaks
- Optimizing application performance
- Troubleshooting memory-related errors

Each memory area serves a distinct purpose:
- **Method Area**: Stores class-level information
- **Heap**: Stores objects and arrays (garbage collected)
- **Stack**: Stores method frames and local variables
- **Native Method Stack**: Supports native method execution
- **PC Registers**: Track execution points for each thread

By understanding how these areas work, you can write better Java code and effectively manage memory in your applications.