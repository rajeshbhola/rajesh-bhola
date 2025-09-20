---
title: "Arrays in Java"
date: 2025-09-20
author: "Rajesh Bhola"
categories: ["Java"]
tags: ["arrays", "1D array", "2D array", "3D array"]
summary: "Master Java arrays with practical examples. Learn single-dimensional, multi-dimensional, jagged arrays, and anonymous arrays. Understand array declaration, initialization, and manipulation techniques."
draft: false
---



## What Are Arrays?

An **array** is a container that holds a fixed number of values of the same type. Think of it as a row of boxes where each box holds one value and has a number (index) starting from 0.

**Key Characteristics:**
- Fixed size (cannot change after creation)
- Stores elements of the same type
- Index-based access (starts at 0)
- Stored in contiguous memory locations

---

## Single-Dimensional Arrays

### **Array Declaration**

```java
// Recommended style
int[] numbers;        // Preferred in Java
String[] names;

// C-style (valid but not recommended)
int numbers[];
String names[];

// Unusual but valid
int []numbers;
```

### **Array Creation**

```java
// Create array of 5 integers
int[] scores = new int[5];

// All elements initialized to default values
// int → 0, double → 0.0, boolean → false, objects → null

System.out.println(scores[0]); // 0 (default value)
System.out.println(scores.length); // 5
```

### **Default Values**

```java
public class DefaultValues {
    public static void main(String[] args) {
        int[] integers = new int[3];
        double[] doubles = new double[3];
        boolean[] booleans = new boolean[3];
        String[] strings = new String[3];
        
        System.out.println("int: " + integers[0]);    // 0
        System.out.println("double: " + doubles[0]);  // 0.0
        System.out.println("boolean: " + booleans[0]); // false
        System.out.println("String: " + strings[0]);   // null
    }
}
```

### **Array Initialization**

```java
// Method 1: Individual assignment
int[] numbers = new int[5];
numbers[0] = 10;
numbers[1] = 20;
numbers[2] = 30;
numbers[3] = 40;
numbers[4] = 50;

// Method 2: Declaration with values
int[] scores = {85, 90, 78, 92, 88};

// Method 3: Using new with values
int[] temps = new int[]{72, 75, 68, 70, 73};

// Method 4: Without size
String[] cities = {"New York", "London", "Tokyo"};
```

### **Accessing Array Elements**

```java
public class ArrayAccess {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};
        
        // Accessing elements
        System.out.println("First: " + numbers[0]);     // 10
        System.out.println("Last: " + numbers[4]);      // 50
        System.out.println("Last: " + numbers[numbers.length - 1]); // 50
        
        // Modifying elements
        numbers[2] = 100;
        System.out.println("Modified: " + numbers[2]);  // 100
        
        // Array bounds
        // System.out.println(numbers[5]); // ArrayIndexOutOfBoundsException!
        // System.out.println(numbers[-1]); // ArrayIndexOutOfBoundsException!
    }
}
```

### **Iterating Through Arrays**

```java
public class ArrayIteration {
    public static void main(String[] args) {
        int[] scores = {85, 90, 78, 92, 88};
        
        // Method 1: Traditional for loop
        System.out.println("Traditional for loop:");
        for (int i = 0; i < scores.length; i++) {
            System.out.println("Index " + i + ": " + scores[i]);
        }
        
        // Method 2: Enhanced for loop (for-each)
        System.out.println("\nEnhanced for loop:");
        for (int score : scores) {
            System.out.println("Score: " + score);
        }
        
        // Method 3: While loop
        System.out.println("\nWhile loop:");
        int i = 0;
        while (i < scores.length) {
            System.out.println(scores[i]);
            i++;
        }
    }
}
```

### **Array of Objects**

```java
public class ObjectArrays {
    public static void main(String[] args) {
        // String array
        String[] names = new String[3];
        names[0] = "Alice";
        names[1] = "Bob";
        names[2] = "Charlie";
        
        // Or initialize directly
        String[] cities = {"New York", "London", "Tokyo", "Paris"};
        
        // Custom object array
        Student[] students = new Student[3];
        students[0] = new Student("John", 20);
        students[1] = new Student("Jane", 22);
        students[2] = new Student("Jack", 21);
        
        // Accessing object methods
        for (Student student : students) {
            System.out.println(student.name + " is " + student.age);
        }
    }
}

class Student {
    String name;
    int age;
    
    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

### **Examples**

```java
public class ArrayOperations {
    public static void main(String[] args) {
        int[] numbers = {45, 23, 67, 12, 89, 34};
        
        // Finding maximum
        int max = numbers[0];
        for (int num : numbers) {
            if (num > max) {
                max = num;
            }
        }
        System.out.println("Maximum: " + max);
        
        // Finding minimum
        int min = numbers[0];
        for (int num : numbers) {
            if (num < min) {
                min = num;
            }
        }
        System.out.println("Minimum: " + min);
        
        // Calculating sum
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        System.out.println("Sum: " + sum);
        
        // Calculating average
        double average = (double) sum / numbers.length;
        System.out.println("Average: " + average);
        
        // Reversing array
        int[] reversed = new int[numbers.length];
        for (int i = 0; i < numbers.length; i++) {
            reversed[i] = numbers[numbers.length - 1 - i];
        }
        
        System.out.print("Reversed: ");
        for (int num : reversed) {
            System.out.print(num + " ");
        }
    }
}
```

---

## Multi-Dimensional Arrays

### **2D Arrays (Matrix)**

```java
public class TwoDArrays {
    public static void main(String[] args) {
        // Declaration and creation
        int[][] matrix = new int[3][4]; // 3 rows, 4 columns
        
        // Initialization with values
        int[][] scores = {
            {85, 90, 78, 92},
            {88, 87, 94, 91},
            {79, 85, 83, 89}
        };
        
        // Accessing elements
        System.out.println("Element [1][2]: " + scores[1][2]); // 94
        
        // Getting dimensions
        int rows = scores.length;        // 3
        int cols = scores[0].length;     // 4
        
        System.out.println("Rows: " + rows + ", Columns: " + cols);
        
        // Iterating through 2D array
        System.out.println("\nGrade Matrix:");
        for (int row = 0; row < scores.length; row++) {
            for (int col = 0; col < scores[row].length; col++) {
                System.out.print(scores[row][col] + "\t");
            }
            System.out.println();
        }
        
        // Using enhanced for loop
        System.out.println("\nUsing enhanced for:");
        for (int[] row : scores) {
            for (int score : row) {
                System.out.print(score + "\t");
            }
            System.out.println();
        }
    }
}
```

### **Examples**

```java
public class MatrixOperations {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        // Sum of all elements
        int sum = 0;
        for (int[] row : matrix) {
            for (int val : row) {
                sum += val;
            }
        }
        System.out.println("Total sum: " + sum);
        
        // Sum of diagonal
        int diagonalSum = 0;
        for (int i = 0; i < matrix.length; i++) {
            diagonalSum += matrix[i][i];
        }
        System.out.println("Diagonal sum: " + diagonalSum);
        
        // Transpose matrix
        int[][] transpose = new int[3][3];
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                transpose[j][i] = matrix[i][j];
            }
        }
        
        System.out.println("Transposed matrix:");
        for (int[] row : transpose) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }
}
```

---

## Jagged Arrays

Arrays where each row can have different number of columns.

```java
public class JaggedArrays {
    public static void main(String[] args) {
        // Creating jagged array
        int[][] jagged = new int[3][];
        jagged[0] = new int[2];  // First row has 2 columns
        jagged[1] = new int[4];  // Second row has 4 columns
        jagged[2] = new int[3];  // Third row has 3 columns
        
        // Initializing jagged array
        int[][] triangle = {
            {1},
            {2, 3},
            {4, 5, 6},
            {7, 8, 9, 10}
        };
        
        System.out.println("Triangle pattern:");
        for (int[] row : triangle) {
            for (int num : row) {
                System.out.print(num + " ");
            }
            System.out.println();
        }
        
        // Pascal's Triangle
        int[][] pascal = new int[5][];
        for (int i = 0; i < pascal.length; i++) {
            pascal[i] = new int[i + 1];
            pascal[i][0] = 1;
            pascal[i][i] = 1;
            
            for (int j = 1; j < i; j++) {
                pascal[i][j] = pascal[i-1][j-1] + pascal[i-1][j];
            }
        }
        
        System.out.println("\nPascal's Triangle:");
        for (int[] row : pascal) {
            for (int num : row) {
                System.out.print(num + " ");
            }
            System.out.println();
        }
    }
}
```

---

## 3D Arrays

```java
public class ThreeDArrays {
    public static void main(String[] args) {
        // 3D array creation
        int[][][] cube = new int[2][3][4];  // 2x3x4 cube
        
        // Small 3D array with values
        int[][][] small3D = {
            {
                {1, 2},
                {3, 4}
            },
            {
                {5, 6},
                {7, 8}
            }
        };
        
        // Accessing elements
        System.out.println("Element [0][1][0]: " + small3D[0][1][0]); // 3
        System.out.println("Element [1][0][1]: " + small3D[1][0][1]); // 6
        
        // Iterating through 3D array
        System.out.println("\n3D Array contents:");
        for (int i = 0; i < small3D.length; i++) {
            System.out.println("Layer " + i + ":");
            for (int j = 0; j < small3D[i].length; j++) {
                for (int k = 0; k < small3D[i][j].length; k++) {
                    System.out.print(small3D[i][j][k] + " ");
                }
                System.out.println();
            }
            System.out.println();
        }
        
        // Practical use: RGB image representation
        int width = 100, height = 100;
        int[][][] image = new int[height][width][3]; // 3 for RGB
        
        // Setting a pixel to red
        image[50][50][0] = 255; // Red
        image[50][50][1] = 0;   // Green
        image[50][50][2] = 0;   // Blue
    }
}
```

---

## Anonymous Arrays

Arrays without explicit reference variable - used for one-time operations.

```java
public class AnonymousArrays {
    public static void main(String[] args) {
        // Passing anonymous array to method
        int sum = calculateSum(new int[]{10, 20, 30, 40, 50});
        System.out.println("Sum: " + sum);
        
        // Cannot specify size with anonymous array
        // calculateSum(new int[5]{10, 20, 30, 40, 50}); // Error!
        
        // Anonymous 2D array
        printMatrix(new int[][]{
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        });
        
        // Practical use: Configuration
        configureSystem(new String[]{
            "--verbose",
            "--output=file.txt",
            "--format=json"
        });
        
        // Inline initialization
        System.out.println("Max: " + findMax(new int[]{45, 67, 23, 89, 12}));
    }
    
    static int calculateSum(int[] numbers) {
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        return sum;
    }
    
    static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }
    
    static void configureSystem(String[] args) {
        for (String arg : args) {
            System.out.println("Processing: " + arg);
        }
    }
    
    static int findMax(int[] arr) {
        int max = arr[0];
        for (int num : arr) {
            if (num > max) max = num;
        }
        return max;
    }
}
```

---

## Array Utility Methods

```java
import java.util.Arrays;

public class ArrayUtilities {
    public static void main(String[] args) {
        int[] numbers = {45, 23, 67, 12, 89, 34};
        
        // Sorting
        Arrays.sort(numbers);
        System.out.println("Sorted: " + Arrays.toString(numbers));
        
        // Searching (binary search - array must be sorted)
        int index = Arrays.binarySearch(numbers, 67);
        System.out.println("Index of 67: " + index);
        
        // Copying
        int[] copy = Arrays.copyOf(numbers, numbers.length);
        int[] partial = Arrays.copyOfRange(numbers, 1, 4);
        
        System.out.println("Copy: " + Arrays.toString(copy));
        System.out.println("Partial: " + Arrays.toString(partial));
        
        // Filling
        int[] filled = new int[5];
        Arrays.fill(filled, 100);
        System.out.println("Filled: " + Arrays.toString(filled));
        
        // Comparing
        int[] arr1 = {1, 2, 3};
        int[] arr2 = {1, 2, 3};
        boolean equal = Arrays.equals(arr1, arr2);
        System.out.println("Arrays equal: " + equal);
        
        // Converting to String
        String str = Arrays.toString(numbers);
        System.out.println("As string: " + str);
    }
}
```

---

## Common Array Patterns

### **Array Copying**

```java
public class ArrayCopying {
    public static void main(String[] args) {
        int[] original = {1, 2, 3, 4, 5};
        
        // Method 1: Manual copy
        int[] copy1 = new int[original.length];
        for (int i = 0; i < original.length; i++) {
            copy1[i] = original[i];
        }
        
        // Method 2: System.arraycopy
        int[] copy2 = new int[original.length];
        System.arraycopy(original, 0, copy2, 0, original.length);
        
        // Method 3: Arrays.copyOf
        int[] copy3 = Arrays.copyOf(original, original.length);
        
        // Method 4: clone()
        int[] copy4 = original.clone();
        
        // All produce same result
        System.out.println(Arrays.toString(copy1));
        System.out.println(Arrays.toString(copy2));
        System.out.println(Arrays.toString(copy3));
        System.out.println(Arrays.toString(copy4));
    }
}
```

### **Array Searching**

```java
public class ArraySearching {
    public static void main(String[] args) {
        int[] numbers = {45, 23, 67, 12, 89, 34};
        
        // Linear search
        int target = 67;
        int index = -1;
        
        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] == target) {
                index = i;
                break;
            }
        }
        
        if (index != -1) {
            System.out.println("Found " + target + " at index " + index);
        } else {
            System.out.println(target + " not found");
        }
        
        // Finding all occurrences
        int[] arr = {1, 5, 3, 5, 2, 5, 4};
        target = 5;
        
        System.out.print("Indices of " + target + ": ");
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                System.out.print(i + " ");
            }
        }
    }
}
```

---

## Common Mistakes and Solutions

```java
public class ArrayMistakes {
    public static void main(String[] args) {
        // Mistake 1: Array index out of bounds
        int[] arr = {1, 2, 3};
        // System.out.println(arr[3]); // Error! Valid indices: 0, 1, 2
        
        // Solution: Check bounds
        if (arr.length > 3) {
            System.out.println(arr[3]);
        }
        
        // Mistake 2: Null array
        int[] nullArray = null;
        // System.out.println(nullArray.length); // NullPointerException!
        
        // Solution: Check for null
        if (nullArray != null) {
            System.out.println(nullArray.length);
        }
        
        // Mistake 3: Comparing arrays with ==
        int[] arr1 = {1, 2, 3};
        int[] arr2 = {1, 2, 3};
        System.out.println(arr1 == arr2); // false (different references)
        
        // Solution: Use Arrays.equals()
        System.out.println(Arrays.equals(arr1, arr2)); // true
        
        // Mistake 4: Modifying array while iterating
        int[] numbers = {1, 2, 3, 4, 5};
        // This works but can be confusing
        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = numbers[i] * 2;
        }
        
        // Mistake 5: Size specification with values
        // int[] wrong = new int[3]{1, 2, 3}; // Error!
        int[] correct = new int[]{1, 2, 3}; // OK
    }
}
```

---

## Performance Considerations

```java
public class ArrayPerformance {
    public static void main(String[] args) {
        int size = 1_000_000;
        
        // Array vs ArrayList for primitives
        int[] array = new int[size];
        
        // Arrays are faster for primitives
        long start = System.nanoTime();
        for (int i = 0; i < size; i++) {
            array[i] = i;
        }
        long end = System.nanoTime();
        System.out.println("Array time: " + (end - start) + " ns");
        
        // Memory usage
        // int array: 4 bytes per element
        // Integer ArrayList: 4 bytes + object overhead per element
        
        System.out.println("Array memory: ~" + (size * 4 / 1024) + " KB");
    }
}
```

---

## Summary

**Key Takeaways:**

1. **Arrays are fixed-size** - cannot change length after creation
2. **Zero-indexed** - first element at index 0
3. **Same type elements** - all elements must be same data type
4. **Default values** - primitives get 0/false, objects get null

**Declaration patterns:**
- 1D: `int[] arr = new int[5]`
- 2D: `int[][] matrix = new int[3][4]`
- Jagged: `int[][] jagged = {{1}, {2, 3}}`
- Anonymous: `method(new int[]{1, 2, 3})`

**Common operations:**
- Access: `arr[index]`
- Length: `arr.length`
- Iterate: enhanced for-loop or traditional for
- Copy: `Arrays.copyOf()` or `clone()`
- Sort: `Arrays.sort()`
- Compare: `Arrays.equals()`

Arrays are fundamental to Java programming. While they have limitations (fixed size, same type), they offer excellent performance and are essential for many algorithms. For dynamic sizing, consider using ArrayList, but arrays remain the best choice for performance-critical code and when size is known.