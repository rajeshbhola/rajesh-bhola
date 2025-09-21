---
title: "Main Method in Java"
date: 2025-09-21
author: "Rajesh Bhola"
categories: ["Java"]
tags: ["main method", "signature", "overloading"]
summary: "Master the Java main method with comprehensive examples. Learn syntax, command-line arguments, method signatures, variations, and how JVM executes the main method as program entry point."
draft: false
---


## Introduction to Main Method

The main method is the entry point of any standalone Java application. When you run a Java program, the JVM looks for this specific method signature to start execution. Understanding the main method is crucial for every Java developer as it's where program execution begins.

## Main Method Signature

### Standard Main Method Declaration

```java
public class MainMethodBasics {
    
    // Standard main method signature
    public static void main(String[] args) {
        System.out.println("Program starts here!");
    }
}
```

### Breaking Down the Signature

```java
public class MainMethodExplained {
    
    // Let's understand each keyword:
    
    // public    - JVM must access it from outside the class
    // static    - JVM calls it without creating an object
    // void      - Returns nothing to JVM
    // main      - Method name that JVM looks for
    // String[]  - Array to receive command-line arguments
    // args      - Parameter name (can be any valid identifier)
    
    public static void main(String[] args) {
        System.out.println("Understanding main method components");
    }
    
    // Why each component is necessary:
    public static void demonstrateNecessity() {
        // PUBLIC: JVM needs to access from outside
        // Without public, JVM can't find and execute it
        
        // STATIC: No object creation needed
        // JVM doesn't know how to create objects of our class
        
        // VOID: JVM doesn't expect a return value
        // Program exit status is handled differently (System.exit)
        
        // MAIN: Predefined name JVM searches for
        
        // STRING[]: To pass runtime arguments
    }
}
```

## Valid Main Method Variations

```java
public class MainMethodVariations {
    
    // Standard signature - Most common
    public static void main(String[] args) {
        System.out.println("Standard main");
    }
    
    // Var-args version (Java 5+) - Also valid
    public static void main(String... args) {
        System.out.println("Var-args main");
        // Functionally identical to String[] args
    }
    
    // Different parameter name - Valid
    public static void main(String[] arguments) {
        System.out.println("Different parameter name");
    }
    
    // With additional modifiers - Valid but unusual
    public static final synchronized strictfp void main(String[] args) {
        System.out.println("Main with extra modifiers");
        // final: Prevents overriding (unnecessary for static)
        // synchronized: Thread-safe (rarely needed for main)
        // strictfp: Strict floating-point calculations
    }
    
    // Order of modifiers can vary - Valid
    static public void main(String[] args) {
        System.out.println("Different modifier order");
        // public static OR static public - both work
    }
}
```

## Invalid Main Method Signatures

```java
public class InvalidMainMethods {
    
    // These will compile but WON'T be recognized as entry points by JVM
    
    // Missing 'public' - Invalid as entry point
    static void main(String[] args) {
        System.out.println("Won't run - not public");
    }
    
    // Missing 'static' - Invalid as entry point
    public void main(String[] args) {
        System.out.println("Won't run - not static");
    }
    
    // Wrong return type - Invalid as entry point
    public static int main(String[] args) {
        System.out.println("Won't run - returns int");
        return 0;
    }
    
    // Wrong parameter type - Invalid as entry point
    public static void main(String args) {  // Not an array
        System.out.println("Won't run - parameter not array");
    }
    
    // Wrong parameter type - Invalid as entry point
    public static void main(int[] args) {  // int[] instead of String[]
        System.out.println("Won't run - wrong parameter type");
    }
    
    // No parameters - Invalid as entry point
    public static void main() {
        System.out.println("Won't run - no parameters");
    }
    
    // Extra parameters - Invalid as entry point
    public static void main(String[] args, int x) {
        System.out.println("Won't run - extra parameters");
    }
}

// Testing class
class MainTester {
    public static void main(String[] args) {
        System.out.println("This is the valid main that will run");
        
        // The invalid methods above can be called as regular methods
        InvalidMainMethods.main();  // Calls the no-parameter version
    }
}
```

## Command-Line Arguments

### Basic Command-Line Arguments

```java
public class CommandLineBasics {
    
    public static void main(String[] args) {
        // Display number of arguments
        System.out.println("Number of arguments: " + args.length);
        
        // Display all arguments
        for (int i = 0; i < args.length; i++) {
            System.out.println("args[" + i + "] = " + args[i]);
        }
        
        // Using enhanced for loop
        System.out.println("\nUsing enhanced for loop:");
        for (String arg : args) {
            System.out.println("Argument: " + arg);
        }
        
        // Check if arguments provided
        if (args.length == 0) {
            System.out.println("\nNo arguments provided!");
            System.out.println("Usage: java CommandLineBasics <arg1> <arg2> ...");
        }
    }
}

// Run examples:
// java CommandLineBasics
// java CommandLineBasics Hello World
// java CommandLineBasics "Hello World" "Java Programming"
// java CommandLineBasics 100 200 300
```

### Processing Different Types of Arguments

```java
public class ArgumentProcessing {
    
    public static void main(String[] args) {
        if (args.length < 3) {
            System.out.println("Usage: java ArgumentProcessing <name> <age> <salary>");
            return;
        }
        
        // String argument
        String name = args[0];
        
        // Converting to integer
        int age = 0;
        try {
            age = Integer.parseInt(args[1]);
        } catch (NumberFormatException e) {
            System.out.println("Invalid age: " + args[1]);
            return;
        }
        
        // Converting to double
        double salary = 0.0;
        try {
            salary = Double.parseDouble(args[2]);
        } catch (NumberFormatException e) {
            System.out.println("Invalid salary: " + args[2]);
            return;
        }
        
        // Optional arguments
        String city = (args.length > 3) ? args[3] : "Unknown";
        boolean isActive = (args.length > 4) ? Boolean.parseBoolean(args[4]) : true;
        
        // Display processed data
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Salary: $" + salary);
        System.out.println("City: " + city);
        System.out.println("Active: " + isActive);
    }
}

// Run examples:
// java ArgumentProcessing John 25 50000
// java ArgumentProcessing "Jane Doe" 30 75000.50 "New York" true
```

### Working with Flags and Options

```java
public class CommandLineFlags {
    
    public static void main(String[] args) {
        boolean verbose = false;
        boolean debug = false;
        String outputFile = null;
        String inputFile = null;
        
        // Process command-line flags
        for (int i = 0; i < args.length; i++) {
            String arg = args[i];
            
            if (arg.equals("--verbose") || arg.equals("-v")) {
                verbose = true;
            } else if (arg.equals("--debug") || arg.equals("-d")) {
                debug = true;
            } else if (arg.equals("--output") || arg.equals("-o")) {
                if (i + 1 < args.length) {
                    outputFile = args[++i];  // Get next argument
                } else {
                    System.out.println("Error: --output requires a filename");
                    return;
                }
            } else if (arg.equals("--input") || arg.equals("-i")) {
                if (i + 1 < args.length) {
                    inputFile = args[++i];
                } else {
                    System.out.println("Error: --input requires a filename");
                    return;
                }
            } else if (arg.equals("--help") || arg.equals("-h")) {
                printHelp();
                return;
            } else if (arg.startsWith("-")) {
                System.out.println("Unknown option: " + arg);
                printHelp();
                return;
            }
        }
        
        // Display configuration
        System.out.println("Configuration:");
        System.out.println("  Verbose: " + verbose);
        System.out.println("  Debug: " + debug);
        System.out.println("  Input file: " + (inputFile != null ? inputFile : "none"));
        System.out.println("  Output file: " + (outputFile != null ? outputFile : "none"));
        
        // Application logic based on flags
        if (verbose) {
            System.out.println("Running in verbose mode...");
        }
        
        if (debug) {
            System.out.println("Debug mode enabled");
        }
    }
    
    private static void printHelp() {
        System.out.println("Usage: java CommandLineFlags [options]");
        System.out.println("Options:");
        System.out.println("  -v, --verbose    Enable verbose output");
        System.out.println("  -d, --debug      Enable debug mode");
        System.out.println("  -i, --input      Specify input file");
        System.out.println("  -o, --output     Specify output file");
        System.out.println("  -h, --help       Show this help message");
    }
}

// Run examples:
// java CommandLineFlags --verbose --input data.txt --output result.txt
// java CommandLineFlags -v -d -i input.txt -o output.txt
// java CommandLineFlags --help
```

## Main Method Overloading

```java
public class MainMethodOverloading {
    
    // The real main method - JVM entry point
    public static void main(String[] args) {
        System.out.println("JVM calls this main method");
        System.out.println("Arguments count: " + args.length);
        
        // We can call other overloaded mains manually
        main(100);
        main("Single string");
        main(args, 42);
    }
    
    // Overloaded main - not called by JVM
    public static void main(int number) {
        System.out.println("Overloaded main with int: " + number);
    }
    
    // Another overload
    public static void main(String str) {
        System.out.println("Overloaded main with String: " + str);
    }
    
    // Yet another overload
    public static void main(String[] args, int extra) {
        System.out.println("Overloaded main with String[] and int: " + extra);
    }
    
    // Instance main method - not called by JVM
    public void main() {
        System.out.println("Instance main method");
    }
    
    // Different return type - not called by JVM
    public static int main(String[] args, boolean flag) {
        System.out.println("Main returning int");
        return 0;
    }
}
```

## Main Method in Inheritance

```java
// Parent class with main
class Parent {
    public static void main(String[] args) {
        System.out.println("Parent main method");
        System.out.println("Class: " + Parent.class.getName());
    }
    
    public static void parentMethod() {
        System.out.println("Parent's static method");
    }
}

// Child without its own main
class ChildInheritsMain extends Parent {
    // Inherits main from Parent
    // Can run: java ChildInheritsMain
    
    public static void childMethod() {
        System.out.println("Child's static method");
    }
}

// Child with its own main
class ChildOverridesMain extends Parent {
    // This hides Parent's main (not override - static methods don't override)
    public static void main(String[] args) {
        System.out.println("Child main method");
        System.out.println("Class: " + ChildOverridesMain.class.getName());
        
        // Can still call Parent's main explicitly
        Parent.main(args);
    }
}

// Testing inheritance
public class MainInheritance {
    public static void main(String[] args) {
        System.out.println("=== Main Method Inheritance Demo ===\n");
        
        // Calling different mains
        System.out.println("Calling Parent.main():");
        Parent.main(args);
        
        System.out.println("\nCalling ChildOverridesMain.main():");
        ChildOverridesMain.main(args);
        
        // Note: When running directly:
        // java Parent -> executes Parent's main
        // java ChildInheritsMain -> executes Parent's main (inherited)
        // java ChildOverridesMain -> executes Child's main
    }
}
```

## Program Exit and Return Values

```java
public class ProgramExit {
    
    public static void main(String[] args) {
        System.out.println("Program started");
        
        // Check arguments
        if (args.length == 0) {
            System.out.println("No arguments provided");
            System.exit(1);  // Exit with error code 1
        }
        
        String command = args[0];
        
        try {
            switch (command) {
                case "success":
                    performSuccessOperation();
                    System.exit(0);  // Normal exit
                    break;
                    
                case "error":
                    performErrorOperation();
                    System.exit(2);  // Exit with error code 2
                    break;
                    
                case "exception":
                    throwException();
                    break;
                    
                case "normal":
                    System.out.println("Normal completion");
                    // No explicit exit - returns normally
                    break;
                    
                default:
                    System.out.println("Unknown command: " + command);
                    System.exit(3);  // Exit with error code 3
            }
        } catch (Exception e) {
            System.err.println("Exception occurred: " + e.getMessage());
            System.exit(4);  // Exit with error code 4
        }
        
        System.out.println("Program ending normally");
        // Implicit return with exit code 0
    }
    
    private static void performSuccessOperation() {
        System.out.println("Operation successful");
    }
    
    private static void performErrorOperation() {
        System.out.println("Operation failed");
    }
    
    private static void throwException() throws Exception {
        throw new Exception("Deliberate exception");
    }
}

// Exit codes convention:
// 0 - Success
// 1-255 - Various error conditions
// Check exit code in terminal:
// Windows: echo %ERRORLEVEL%
// Linux/Mac: echo $?
```

## Multiple Classes with Main Methods

```java
// First class with main
class Application1 {
    public static void main(String[] args) {
        System.out.println("Application1 is running");
        System.out.println("Args for App1: " + args.length);
    }
}

// Second class with main
class Application2 {
    public static void main(String[] args) {
        System.out.println("Application2 is running");
        System.out.println("Args for App2: " + args.length);
        
        // Can call another class's main
        System.out.println("\nCalling Application1 from Application2:");
        Application1.main(new String[]{"Called", "from", "App2"});
    }
}

// Third class with main
public class MultipleMainMethods {
    public static void main(String[] args) {
        System.out.println("MultipleMainMethods is running");
        
        // Can call other mains programmatically
        System.out.println("\nCalling other main methods:");
        
        Application1.main(args);
        System.out.println();
        
        Application2.main(new String[]{"Custom", "Arguments"});
    }
}

// To run different mains:
// java Application1
// java Application2
// java MultipleMainMethods
```

## Practical Examples

### Example 1: Calculator Application

```java
public class Calculator {
    
    public static void main(String[] args) {
        if (args.length < 3) {
            printUsage();
            System.exit(1);
        }
        
        try {
            double num1 = Double.parseDouble(args[0]);
            String operator = args[1];
            double num2 = Double.parseDouble(args[2]);
            
            double result = 0;
            boolean validOperation = true;
            
            switch (operator) {
                case "+":
                case "add":
                    result = num1 + num2;
                    break;
                    
                case "-":
                case "subtract":
                    result = num1 - num2;
                    break;
                    
                case "*":
                case "multiply":
                    result = num1 * num2;
                    break;
                    
                case "/":
                case "divide":
                    if (num2 == 0) {
                        System.out.println("Error: Division by zero!");
                        System.exit(2);
                    }
                    result = num1 / num2;
                    break;
                    
                case "%":
                case "modulo":
                    result = num1 % num2;
                    break;
                    
                case "^":
                case "power":
                    result = Math.pow(num1, num2);
                    break;
                    
                default:
                    System.out.println("Unknown operator: " + operator);
                    validOperation = false;
                    printUsage();
                    System.exit(3);
            }
            
            if (validOperation) {
                System.out.printf("%.2f %s %.2f = %.2f%n", 
                                num1, operator, num2, result);
            }
            
        } catch (NumberFormatException e) {
            System.out.println("Error: Invalid number format");
            printUsage();
            System.exit(4);
        }
    }
    
    private static void printUsage() {
        System.out.println("Usage: java Calculator <number1> <operator> <number2>");
        System.out.println("Operators: +, -, *, /, %, ^");
        System.out.println("Examples:");
        System.out.println("  java Calculator 10 + 5");
        System.out.println("  java Calculator 20 / 4");
        System.out.println("  java Calculator 2 ^ 8");
    }
}

// Run examples:
// java Calculator 10 + 5
// java Calculator 100 / 25
// java Calculator 2 ^ 10
```

### Example 2: File Processor

```java
import java.io.*;
import java.nio.file.*;

public class FileProcessor {
    
    public static void main(String[] args) {
        String operation = null;
        String filename = null;
        String content = null;
        
        // Parse arguments
        for (int i = 0; i < args.length; i++) {
            switch (args[i]) {
                case "--read":
                case "-r":
                    operation = "read";
                    if (i + 1 < args.length) {
                        filename = args[++i];
                    }
                    break;
                    
                case "--write":
                case "-w":
                    operation = "write";
                    if (i + 1 < args.length) {
                        filename = args[++i];
                    }
                    if (i + 1 < args.length) {
                        content = args[++i];
                    }
                    break;
                    
                case "--append":
                case "-a":
                    operation = "append";
                    if (i + 1 < args.length) {
                        filename = args[++i];
                    }
                    if (i + 1 < args.length) {
                        content = args[++i];
                    }
                    break;
                    
                case "--delete":
                case "-d":
                    operation = "delete";
                    if (i + 1 < args.length) {
                        filename = args[++i];
                    }
                    break;
                    
                case "--help":
                case "-h":
                    printHelp();
                    return;
                    
                default:
                    if (!args[i].startsWith("-")) {
                        // Skip non-flag arguments (they're handled above)
                    } else {
                        System.out.println("Unknown option: " + args[i]);
                        printHelp();
                        return;
                    }
            }
        }
        
        // Execute operation
        if (operation == null || filename == null) {
            System.out.println("Error: Missing required arguments");
            printHelp();
            System.exit(1);
        }
        
        try {
            switch (operation) {
                case "read":
                    readFile(filename);
                    break;
                case "write":
                    writeFile(filename, content);
                    break;
                case "append":
                    appendFile(filename, content);
                    break;
                case "delete":
                    deleteFile(filename);
                    break;
            }
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
            System.exit(2);
        }
    }
    
    private static void readFile(String filename) throws IOException {
        String content = Files.readString(Paths.get(filename));
        System.out.println("File content:");
        System.out.println(content);
    }
    
    private static void writeFile(String filename, String content) throws IOException {
        Files.writeString(Paths.get(filename), content != null ? content : "");
        System.out.println("File written successfully");
    }
    
    private static void appendFile(String filename, String content) throws IOException {
        Files.writeString(Paths.get(filename), 
                         content != null ? content : "", 
                         StandardOpenOption.CREATE,
                         StandardOpenOption.APPEND);
        System.out.println("Content appended successfully");
    }
    
    private static void deleteFile(String filename) throws IOException {
        Files.delete(Paths.get(filename));
        System.out.println("File deleted successfully");
    }
    
    private static void printHelp() {
        System.out.println("File Processor - Command Line File Operations");
        System.out.println("Usage:");
        System.out.println("  java FileProcessor --read <filename>");
        System.out.println("  java FileProcessor --write <filename> <content>");
        System.out.println("  java FileProcessor --append <filename> <content>");
        System.out.println("  java FileProcessor --delete <filename>");
        System.out.println("  java FileProcessor --help");
        System.out.println("\nOptions:");
        System.out.println("  -r, --read     Read file contents");
        System.out.println("  -w, --write    Write content to file");
        System.out.println("  -a, --append   Append content to file");
        System.out.println("  -d, --delete   Delete file");
        System.out.println("  -h, --help     Show this help message");
    }
}
```

### Example 3: Environment Information

```java
public class EnvironmentInfo {
    
    public static void main(String[] args) {
        boolean showAll = false;
        boolean showSystem = false;
        boolean showEnv = false;
        boolean showRuntime = false;
        
        // Parse arguments
        if (args.length == 0) {
            showAll = true;
        } else {
            for (String arg : args) {
                switch (arg.toLowerCase()) {
                    case "--all":
                        showAll = true;
                        break;
                    case "--system":
                        showSystem = true;
                        break;
                    case "--env":
                        showEnv = true;
                        break;
                    case "--runtime":
                        showRuntime = true;
                        break;
                    default:
                        System.out.println("Unknown option: " + arg);
                        System.out.println("Valid options: --all, --system, --env, --runtime");
                        return;
                }
            }
        }
        
        if (showAll || showSystem) {
            showSystemProperties();
        }
        
        if (showAll || showEnv) {
            showEnvironmentVariables();
        }
        
        if (showAll || showRuntime) {
            showRuntimeInfo();
        }
    }
    
    private static void showSystemProperties() {
        System.out.println("=== System Properties ===");
        System.out.println("Java Version: " + System.getProperty("java.version"));
        System.out.println("Java Vendor: " + System.getProperty("java.vendor"));
        System.out.println("Java Home: " + System.getProperty("java.home"));
        System.out.println("OS Name: " + System.getProperty("os.name"));
        System.out.println("OS Version: " + System.getProperty("os.version"));
        System.out.println("OS Architecture: " + System.getProperty("os.arch"));
        System.out.println("User Name: " + System.getProperty("user.name"));
        System.out.println("User Home: " + System.getProperty("user.home"));
        System.out.println("Current Directory: " + System.getProperty("user.dir"));
        System.out.println();
    }
    
    private static void showEnvironmentVariables() {
        System.out.println("=== Environment Variables ===");
        System.out.println("PATH: " + System.getenv("PATH"));
        System.out.println("JAVA_HOME: " + System.getenv("JAVA_HOME"));
        System.out.println("CLASSPATH: " + System.getenv("CLASSPATH"));
        System.out.println("TEMP: " + System.getenv("TEMP"));
        System.out.println();
    }
    
    private static void showRuntimeInfo() {
        System.out.println("=== Runtime Information ===");
        Runtime runtime = Runtime.getRuntime();
        long maxMemory = runtime.maxMemory();
        long totalMemory = runtime.totalMemory();
        long freeMemory = runtime.freeMemory();
        long usedMemory = totalMemory - freeMemory;
        
        System.out.println("Available Processors: " + runtime.availableProcessors());
        System.out.println("Max Memory: " + formatBytes(maxMemory));
        System.out.println("Total Memory: " + formatBytes(totalMemory));
        System.out.println("Free Memory: " + formatBytes(freeMemory));
        System.out.println("Used Memory: " + formatBytes(usedMemory));
        System.out.println();
    }
    
    private static String formatBytes(long bytes) {
        long kb = bytes / 1024;
        long mb = kb / 1024;
        return mb + " MB (" + bytes + " bytes)";
    }
}
```

## Common Pitfalls and Best Practices

```java
public class MainMethodBestPractices {
    
    // BEST PRACTICE: Validate arguments early
    public static void main(String[] args) {
        // Validate argument count
        if (!validateArguments(args)) {
            printUsage();
            System.exit(1);
        }
        
        try {
            processApplication(args);
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            e.printStackTrace();
            System.exit(2);
        }
    }
    
    private static boolean validateArguments(String[] args) {
        if (args.length < 2) {
            System.err.println("Error: Insufficient arguments");
            return false;
        }
        
        // Validate specific arguments
        if (!args[0].matches("\\d+")) {
            System.err.println("Error: First argument must be a number");
            return false;
        }
        
        return true;
    }
    
    private static void processApplication(String[] args) {
        // Main application logic
        System.out.println("Processing with " + args.length + " arguments");
    }
    
    private static void printUsage() {
        System.out.println("Usage: java MainMethodBestPractices <number> <text> [options]");
        System.out.println("  number - A numeric value");
        System.out.println("  text   - Text to process");
        System.out.println("  options - Optional parameters");
    }
}

// Common Pitfalls to Avoid
class MainMethodPitfalls {
    
    // PITFALL 1: Forgetting array can be empty
    public static void main(String[] args) {
        // BAD: Direct access without checking
        // String first = args[0];  // ArrayIndexOutOfBoundsException if no args
        
        // GOOD: Check length first
        String first = args.length > 0 ? args[0] : "default";
    }
}

// PITFALL 2: Wrong signature variations
class WrongSignatures {
    // These compile but aren't entry points:
    
    // Missing array brackets
    public static void main(String args) { }
    
    // Wrong parameter type
    public static void main(String[] argc) { }  // Valid but confusing name
    
    // Return type
    public static int main(String[] args) { return 0; }
}

// PITFALL 3: Exception handling
class ExceptionInMain {
    public static void main(String[] args) throws Exception {
        // Throwing exceptions from main is valid but not recommended
        // Better to catch and handle with proper exit codes
        
        try {
            riskyOperation();
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            System.exit(1);  // Proper exit code
        }
    }
    
    private static void riskyOperation() throws Exception {
        throw new Exception("Something went wrong");
    }
}
```

## Conclusion

The main method is the gateway to Java application execution. Key points to remember:

- **Signature**: Must be `public static void main(String[] args)` or with var-args
- **Purpose**: Entry point where JVM starts program execution
- **Arguments**: Receives command-line arguments as String array
- **Static**: Called without creating an instance of the class
- **Public**: Must be accessible to JVM from outside the class
- **Void**: Doesn't return a value to JVM (use System.exit for exit codes)
- **Overloading**: Can overload main but JVM only recognizes standard signature
- **Multiple Mains**: Each class can have its own main method
- **Best Practices**: Always validate arguments, provide usage help, handle exceptions properly

Understanding the main method thoroughly helps in creating robust command-line applications and understanding Java program execution flow.