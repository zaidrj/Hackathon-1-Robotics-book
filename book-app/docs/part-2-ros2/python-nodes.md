---
title: "Chapter 7: Building Nodes with Python (rclpy)"
sidebar_label: "CHAPTER 7: BUILDING NODES WITH PYTHON (RCLPY)"
---

# Chapter 7: Building Nodes with Python (rclpy)

## Learning Objectives

By the end of this chapter, you will be able to:
-   **Write** a basic ROS 2 node in Python using the `rclpy` library.
-   **Implement** publishers and subscribers to send and receive data over topics.
-   **Utilize** parameters to make your nodes configurable.
-   **Understand** the conceptual role of launch files for starting complex systems.

## Introduction

In the last chapter, we learned about the theoretical architecture of ROS 2. Now, it's time to bring that theory to life. This chapter is our first hands-on introduction to writing code for ROS 2. We will be using Python, one of the two primary languages supported by ROS 2 (the other being C++). The Python client library for ROS 2 is called **rclpy** (ROS Client Library for Python), and it provides all the tools we need to create nodes, publish and subscribe to topics, and more.

## Main Sections

### Hello, Robot World: Your First `rclpy` Node

Every ROS 2 program begins with a few key ingredients. Let's look at the "Hello, World" equivalent of a ROS 2 node.

```python
# Import the rclpy library
import rclpy
# Import the Node class from rclpy.node
from rclpy.node import Node

# Define a class for your node that inherits from the base Node class
class MyFirstNode(Node):
    def __init__(self):
        # Call the constructor of the parent class (Node)
        # This gives your node a name
        super().__init__('my_first_node')
        # Create a timer that calls a callback function every 1 second
        self.timer = self.create_timer(1.0, self.timer_callback)

    def timer_callback(self):
        # This function is executed every time the timer fires
        self.get_logger().info('Hello, Robot World!')

def main(args=None):
    # Initialize the rclpy library
    rclpy.init(args=args)

    # Create an instance of your node
    my_node = MyFirstNode()

    # "Spin" the node, which allows it to process callbacks (like the timer)
    # The node will keep running until you shut it down (e.g., with Ctrl+C)
    rclpy.spin(my_node)

    # Clean up and destroy the node
    my_node.destroy_node()
    # Shut down the rclpy library
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

This simple program demonstrates the fundamental lifecycle of a ROS 2 node:
1.  `rclpy.init()`: Initializes the ROS 2 communication system.
2.  `MyFirstNode()`: Creates an instance of your node.
3.  `rclpy.spin()`: Enters a loop, waiting for and executing any events or callbacks (like timer events, topic messages, etc.). This is the workhorse function that keeps your node alive and responsive.
4.  `destroy_node()` and `shutdown()`: Cleanly closes the node and shuts down ROS 2 communications.

### Communicating with Topics: Publishers and Subscribers

The most common way for nodes to communicate is via topics. Let's create two nodes: one that publishes a message and one that subscribes to it.

First, we need a message type. ROS 2 has many standard message types, like `String` for text, `Int32` for integers, etc. We'll use `std_msgs/msg/String`.

#### The Publisher Node

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class SimplePublisher(Node):
    def __init__(self):
        super().__init__('simple_publisher')
        # Create a publisher on the 'chatter' topic, using the String message type
        self.publisher_ = self.create_publisher(String, 'chatter', 10)
        self.timer = self.create_timer(0.5, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello! Count: {self.i}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1

# ... (main function is the same as before) ...
```
-   `create_publisher(String, 'chatter', 10)`: This line creates a publisher.
    -   The first argument is the message type (`String`).
    -   The second is the topic name (`chatter`).
    -   The third is the "queue size," which is a quality-of-service (QoS) setting that limits how many messages are buffered if they are being sent faster than they can be processed.
-   `self.publisher_.publish(msg)`: This is the command that sends the message over the topic.

#### The Subscriber Node

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class SimpleSubscriber(Node):
    def __init__(self):
        super().__init__('simple_subscriber')
        # Create a subscriber on the 'chatter' topic
        self.subscription = self.create_subscription(
            String,
            'chatter',
            self.listener_callback, # The function to call when a message is received
            10)

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')

# ... (main function is the same as before) ...
```
-   `create_subscription(...)`: This creates a subscriber.
    -   It takes the message type and topic name, just like the publisher.
    -   The crucial third argument is the **callback function** (`self.listener_callback`). This is the function that `rclpy` will automatically call whenever a new message arrives on the `chatter` topic.

If you run these two nodes simultaneously, you will see the publisher sending messages and the subscriber receiving them, demonstrating the core communication pattern of ROS 2.

### Making Nodes Configurable: Parameters

Hardcoding values like timer rates or topic names is bad practice. **Parameters** allow you to configure your node from the outside (e.g., from the command line or a launch file) without changing the code.

```python
class ParameterNode(Node):
    def __init__(self):
        super().__init__('parameter_node')
        # Declare a parameter with a name and a default value
        self.declare_parameter('my_parameter', 'world')

        self.timer = self.create_timer(1.0, self.timer_callback)

    def timer_callback(self):
        # Get the current value of the parameter
        my_param = self.get_parameter('my_parameter').get_parameter_value().string_value
        self.get_logger().info(f'Hello, {my_param}!')
```
-   `declare_parameter('my_parameter', 'world')`: This makes the node aware of a parameter named `my_parameter` and gives it a default value of `'world'`.
-   `get_parameter(...)`: This retrieves the parameter's current value.

Now you can run this node and change its behavior from the command line, which is incredibly powerful for tuning and experimentation.

### Conceptual Overview: Launch Files

When your system grows to include many nodes, starting each one in a separate terminal becomes tedious. **Launch files** are the ROS 2 way to start up and configure an entire robotic system with a single command.

A launch file is a Python script that describes your system:
-   Which nodes to start.
-   What parameters to set for each node.
-   How to connect them (e.g., remapping topic names).

We will dive into the details of writing launch files later, but for now, understand their conceptual role: they are the "script" that brings your entire robotic "play" to life, ensuring all the "actors" (nodes) are on stage and configured correctly.

## Summary

This chapter provided our first practical steps into ROS 2 programming with Python's `rclpy` library. We learned the fundamental structure of a ROS 2 node, from initialization to shutdown. We implemented the most common communication pattern, publisher/subscriber, to send and receive data over topics. We also saw how to use parameters to make our nodes flexible and configurable. Finally, we introduced the conceptual role of launch files as the standard way to run complex, multi-node robotic systems. You are now equipped with the basic building blocks to create your own ROS 2 applications.

## Key Terms

-   **`rclpy`:** The ROS 2 Client Library for Python, providing the tools to interact with the ROS 2 system.
-   **`rclpy.spin()`:** The function that keeps a node running and processing events.
-   **Callback:** A function that is passed as an argument to another function and is executed when a specific event occurs (e.g., receiving a message).
-   **Publisher:** A node that sends messages on a topic.
-   **Subscriber:** A node that receives messages from a topic.
-   **Parameter:** A configurable value that can be set externally to modify a node's behavior.
-   **Launch File:** A script used to start and configure a collection of ROS 2 nodes.

## Exercises

1.  **Code:** Modify the `SimplePublisher` node to publish a different message (e.g., your name) on a different topic name (e.g., `/my_topic`).
2.  **Code:** Write a new subscriber node that listens to your new topic and prints the message.
3.  **Analysis:** What would happen if you started two `SimplePublisher` nodes at the same time? What would happen if you started two `SimpleSubscriber` nodes at the same time?
4.  **Design:** You want to add a parameter to your `SimplePublisher` that controls the publishing rate (the frequency of the timer). How would you modify the code to declare and use this parameter?