---
title: "Literals in Java"
date: 2025-09-20
author: "Rajesh Bhola"
categories: ["Java"]
tags: ["literals", "string literals", "binary literals"]
summary: "Master Java literals including decimal, binary, octal, and hexadecimal number systems. Learn integer, floating-point, character, and string literals with practical coding examples."
draft: false
---



## What Are Literals?

Literals are **fixed values** written directly in your code. When you write `int x = 100;`, the number `100` is a literal. Java supports different types of literals for different data types and number systems.

---

## Integer Literals:

Java allows you to write integer values in four different number systems: decimal, binary, octal, and hexadecimal.

### **1. Decimal Literals (Base 10)**
The default and most common system we use daily.

```java
int decimal = 100;
int negative = -500;
int withUnderscore = 1_000_000; // Underscores for readability

System.out.println(decimal);        // 100
System.out.println(withUnderscore); // 1000000
```

### **2. Binary Literals (Base 2)**
Prefix: `0b` or `0B` - Uses only digits 0 and 1

```java
int binary = 0b1100100;  // Binary for 100
int binary2 = 0B101010;  // Binary for 42

System.out.println(binary);  // 100
System.out.println(binary2); // 42

// Practical use: File permissions
int readWrite = 0b110;      // 6 (read=4, write=2)
int fullAccess = 0b111;     // 7 (read=4, write=2, execute=1)

// With underscores for clarity
int bits = 0b1111_0000_1010_0101;
```

**Understanding Binary:**
- Each position represents a power of 2
- `0b1100100` = 1×64 + 1×32 + 0×16 + 0×8 + 1×4 + 0×2 + 0×1 = 100

### **3. Octal Literals (Base 8)**
Prefix: `0` (just zero) - Uses digits 0-7

```java
int octal = 0144;    // Octal for 100
int octal2 = 052;    // Octal for 42

System.out.println(octal);  // 100
System.out.println(octal2); // 42

// Common mistake - invalid digits
// int wrong = 0189; // Error! 8 and 9 not valid in octal

// File permissions in Unix/Linux
int permission = 0755; // rwxr-xr-x
```

**Understanding Octal:**
- Each position represents a power of 8
- `0144` = 1×64 + 4×8 + 4×1 = 100

### **4. Hexadecimal Literals (Base 16)**
Prefix: `0x` or `0X` - Uses digits 0-9 and letters A-F (or a-f)

```java
int hex = 0x64;      // Hex for 100
int hex2 = 0X2A;     // Hex for 42
int hexLower = 0xabcd;
int hexUpper = 0xABCD;

System.out.println(hex);     // 100
System.out.println(hex2);    // 42

// Common use: Colors in RGB
int red = 0xFF0000;      // Pure red
int green = 0x00FF00;    // Pure green
int blue = 0x0000FF;     // Pure blue
int white = 0xFFFFFF;    // White
int black = 0x000000;    // Black

// Memory addresses often shown in hex
int address = 0x7FFF_ABCD;
```

**Understanding Hexadecimal:**
- A=10, B=11, C=12, D=13, E=14, F=15
- `0x64` = 6×16 + 4×1 = 100

### **Comparison of Number Systems:**

```java
public class NumberSystemsDemo {
    public static void main(String[] args) {
        // All represent the same value: 100
        int decimal = 100;
        int binary = 0b1100100;
        int octal = 0144;
        int hex = 0x64;
        
        System.out.println("Decimal: " + decimal);
        System.out.println("Binary: " + binary);
        System.out.println("Octal: " + octal);
        System.out.println("Hex: " + hex);
        
        // All print 100
        System.out.println(decimal == binary); // true
        System.out.println(binary == octal);   // true
        System.out.println(octal == hex);      // true
    }
}
```

---

## Long Integer Literals:

For `long` values, use `L` or `l` suffix (uppercase `L` preferred for clarity).

```java
long small = 100;           // int promoted to long
long medium = 100L;         // Explicit long
long large = 10_000_000_000L; // Must use L for large values

// Error without L suffix
// long wrong = 10000000000; // Compile error!

// Works with all number systems
long binaryLong = 0b1111_1111_1111_1111L;
long hexLong = 0xFFFFFFFFL;

// Timestamps often use long
long timestamp = System.currentTimeMillis();
System.out.println("Current time: " + timestamp);
```

---

## Underscores in Numeric Literals (Java 7+)

Makes large numbers more readable - ignored by compiler.

```java
// Readable numbers
int million = 1_000_000;
long billion = 1_000_000_000L;
int creditCard = 1234_5678_9012_3456;
int binary = 0b1111_0000_1010_0101;
int hex = 0xFF_EC_DE_5E;

System.out.println(million); // 1000000

// Rules for underscores:
// int wrong1 = _100;        // Error: Can't start with _
// int wrong2 = 100_;        // Error: Can't end with _
// int wrong3 = 0x_FF;       // Error: Can't be after 0x
// float wrong4 = 3._14f;    // Error: Can't be adjacent to decimal point
// int ok = 10_00_00;        // OK: Can use anywhere in middle
```

---

## Floating-Point Literals:

### **Float Literals**
Must use `f` or `F` suffix.

```java
float pi = 3.14f;
float piUpper = 3.14F;
float scientific = 3.14e2f;    // 314.0 (3.14 × 10²)
float scientific2 = 3.14E-2f;  // 0.0314 (3.14 × 10⁻²)

// Error without f suffix
// float wrong = 3.14; // Compile error! Defaults to double

// Scientific notation examples
float large = 1.23e10f;      // 12,300,000,000
float small = 1.23e-10f;     // 0.000000000123

System.out.println("Scientific: " + scientific);  // 314.0
System.out.println("Large: " + large);
```

### **Double Literals**
Default for decimal numbers - `d` or `D` suffix optional.

```java
double pi = 3.14159;          // No suffix needed
double piExplicit = 3.14159d; // Explicit, optional
double scientific = 6.022e23; // Avogadro's number
double planck = 6.626e-34;    // Planck's constant

// Very large and small numbers
double huge = 1.7976931348623157e308;  // Near max double
double tiny = 4.9e-324;                // Near min positive double

System.out.println("Pi: " + pi);
System.out.println("Scientific: " + scientific);
```

### **Special Floating-Point Values**

```java
// Infinity
float positiveInf = Float.POSITIVE_INFINITY;
float negativeInf = Float.NEGATIVE_INFINITY;
double divByZero = 1.0 / 0.0;  // Positive infinity

System.out.println(positiveInf); // Infinity
System.out.println(divByZero);   // Infinity

// NaN (Not a Number)
float notANumber = Float.NaN;
double zeroByZero = 0.0 / 0.0;   // NaN

System.out.println(notANumber);  // NaN
System.out.println(zeroByZero);  // NaN

// Checking for special values
if (Double.isInfinite(divByZero)) {
    System.out.println("Is infinite!");
}

if (Double.isNaN(zeroByZero)) {
    System.out.println("Is NaN!");
}
```

---

## Character Literals:

Single characters enclosed in **single quotes**.

### **Basic Characters**

```java
char letter = 'A';
char digit = '9';
char symbol = '@';
char space = ' ';

System.out.println(letter); // A

// Invalid - use single quotes
// char wrong = "A";  // Error! Double quotes for strings
// char wrong2 = 'AB'; // Error! Only one character
```

### **Unicode Escape Sequences**

```java
// Unicode format: \uXXXX (4 hex digits)
char unicodeA = '\u0041';      // 'A'
char copyright = '\u00A9';     // ©
char heart = '\u2764';         // ❤
char chinese = '\u4E2D';       // 中
char emoji = '\u263A';         // ☺

System.out.println(unicodeA);  // A
System.out.println(copyright); // ©
System.out.println(heart);     // ❤
```

### **Escape Sequences**

```java
// Common escape sequences
char newline = '\n';      // New line
char tab = '\t';          // Tab
char backslash = '\\';    // Backslash
char singleQuote = '\'';  // Single quote
char doubleQuote = '\"';  // Double quote (less common in char)
char carriageReturn = '\r'; // Carriage return
char backspace = '\b';    // Backspace
char formFeed = '\f';     // Form feed

// Using them
System.out.println("Line 1\nLine 2");
System.out.println("Column 1\tColumn 2");
System.out.println("Path: C:\\Users\\Documents");
System.out.println('\''); // '
```

### **Numeric Character Values**

```java
// Using ASCII/Unicode values
char fromInt = 65;           // 'A' (ASCII 65)
char space = 32;             // ' ' (ASCII 32)
char zero = 48;              // '0' (ASCII 48)

System.out.println(fromInt); // A
System.out.println(space);   // (space)

// Converting back
char grade = 'A';
int value = grade;           // 65
System.out.println("'A' = " + value);
```

---

## String Literals:

Text enclosed in **double quotes**.

### **Basic Strings**

```java
String simple = "Hello World";
String empty = "";
String withSpaces = "  text with spaces  ";
String number = "123"; // String, not integer

System.out.println(simple); // Hello World
```

### **Escape Sequences in Strings**

```java
// Multi-line effect
String multiline = "Line 1\nLine 2\nLine 3";
System.out.println(multiline);
// Output:
// Line 1
// Line 2
// Line 3

// Tabs
String tabbed = "Name:\tJohn\nAge:\t25";
System.out.println(tabbed);

// Quotes within strings
String quoted = "She said \"Hello\"";
System.out.println(quoted); // She said "Hello"

// Windows file paths
String path = "C:\\Users\\Documents\\file.txt";
System.out.println(path); // C:\Users\Documents\file.txt
```

### **String Concatenation**

```java
String firstName = "John";
String lastName = "Doe";
String fullName = firstName + " " + lastName;

System.out.println(fullName); // John Doe

// Mixing types - automatic conversion to String
String info = "Age: " + 25 + ", Score: " + 95.5;
System.out.println(info); // Age: 25, Score: 95.5

// Order matters!
String result1 = "Sum: " + 10 + 20;    // "Sum: 1020"
String result2 = "Sum: " + (10 + 20);  // "Sum: 30"

System.out.println(result1);
System.out.println(result2);
```

### **Text Blocks (Java 13+)**

Multi-line strings without escape sequences.

```java
// Text block - starts and ends with """
String textBlock = """
        This is a text block.
        It preserves formatting.
            Including indentation!
        No need for \\n or \\t
        """;

System.out.println(textBlock);

// Practical example: JSON
String json = """
        {
            "name": "John Doe",
            "age": 30,
            "city": "New York",
            "active": true
        }
        """;

System.out.println(json);

// HTML example
String html = """
        <html>
            <body>
                <h1>Welcome</h1>
                <p>Hello World!</p>
            </body>
        </html>
        """;
```

---

## Boolean Literals:

Only two values: `true` and `false` (lowercase only).

```java
boolean isActive = true;
boolean hasError = false;

// Result of comparisons
boolean result = (10 > 5);     // true
boolean equal = (10 == 10);    // true
boolean notEqual = (5 != 5);   // false

// Cannot use numbers
// boolean wrong = 1;  // Error! Not like C/C++
// boolean wrong2 = 0; // Error!

// In conditions
if (isActive) {
    System.out.println("Active");
}

if (!hasError) {
    System.out.println("No errors");
}
```

---

## Null Literal:

Special literal for reference types - represents "no value".

```java
String text = null;  // No string object
Integer number = null; // No Integer object

// Cannot use with primitives
// int wrong = null; // Error! Primitives can't be null

// Checking for null
if (text == null) {
    System.out.println("No text");
}

// NullPointerException risk
// int length = text.length(); // Error at runtime!
```

---

## Practical Examples:

### **Example 1:**
Color Representation

```java
public class ColorLiterals {
    public static void main(String[] args) {
        // Using hex literals for RGB colors
        int red = 0xFF0000;
        int green = 0x00FF00;
        int blue = 0x0000FF;
        int purple = 0x800080;
        
        // Extracting color components
        int r = (red >> 16) & 0xFF;
        int g = (red >> 8) & 0xFF;
        int b = red & 0xFF;
        
        System.out.println("Red component: " + r);
    }
}
```

### **Example 2:**
File Permissions

```java
public class PermissionLiterals {
    public static void main(String[] args) {
        // Unix-style permissions in octal
        int readWriteExecute = 0777;
        int readWrite = 0666;
        int readOnly = 0444;
        
        // Or using binary for clarity
        int read = 0b100;    // 4
        int write = 0b010;   // 2
        int execute = 0b001; // 1
        
        int fullPermission = read | write | execute; // 7
        System.out.println("Permission: " + fullPermission);
    }
}
```

### **Example 3:**
Network Configuration

```java
public class NetworkLiterals {
    public static void main(String[] args) {
        // IP address parts
        int ip1 = 192;
        int ip2 = 168;
        int ip3 = 1;
        int ip4 = 1;
        
        // Port numbers
        int httpPort = 80;
        int httpsPort = 443;
        int customPort = 8080;
        
        String ipAddress = ip1 + "." + ip2 + "." + ip3 + "." + ip4;
        System.out.println("IP: " + ipAddress);
        System.out.println("Port: " + customPort);
    }
}
```

---

## Common Mistakes:

```java
// Mistake 1: Wrong suffix
// long wrong = 10000000000; // Error! Needs L
long correct = 10000000000L;

// Mistake 2: Wrong quotes
// char wrong = "A";  // Error! Use single quotes
char correct = 'A';

// Mistake 3: Invalid octal
// int wrong = 0189; // Error! 8 and 9 invalid in octal
int correct = 189; // Use decimal

// Mistake 4: Underscore placement
// int wrong = _100;  // Error!
// int wrong2 = 100_; // Error!
int correct = 10_00; // OK

// Mistake 5: Binary/hex without prefix
int decimal100 = 100;    // This is decimal
int binary100 = 0b100;   // This is 4 in binary!
```

---

## Summary

**Key Points:**
- **Integer literals** support 4 number systems: decimal (100), binary (0b), octal (0), hexadecimal (0x)
- **Long literals** need `L` suffix for large values
- **Float literals** must have `f` suffix; doubles don't require `d`
- **Character literals** use single quotes and support Unicode (`\uXXXX`)
- **String literals** use double quotes and support escape sequences
- **Boolean literals** are `true` or `false` only
- **Underscores** improve readability in numbers (Java 7+)
- **Text blocks** (Java 13+) simplify multi-line strings

Understanding literals is essential for writing clear, maintainable code. Choose the appropriate number system and literal type for your specific use case - hex for colors, binary for flags, and decimal for everyday numbers.