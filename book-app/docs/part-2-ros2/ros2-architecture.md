---
title: "Chapter 6: The ROS 2 Architecture"
sidebar_label: "CHAPTER 6: THE ROS 2 ARCHITECTURE"
---

# Chapter 6: The ROS 2 Architecture

## Learning Objectives

By the end of this chapter, you will be able to:
-   **Diagram** the ROS 2 computational graph, including nodes, topics, services, and actions.
-   **Differentiate** between the use cases for topics (streaming data), services (request/reply), and actions (long-running tasks).
-   **Describe** the role of Nodes as the fundamental processing units in ROS 2.
-   **Explain** the underlying function of DDS as the communication layer for ROS 2.
-   **Recognize** the importance of real-time constraints in robotic control.

## Introduction

In the previous chapter, we introduced the high-level concept of ROS 2 as the robot's nervous system. Now, we will dissect that system to understand its core anatomical structures. The elegance of ROS 2 lies in its simple yet powerful communication patterns, which allow us to build complex systems from simple, reusable parts. This set of structures is known as the **ROS computational graph**.

## Main Sections

### The Building Blocks: Nodes

The **Node** is the most fundamental unit of processing in ROS 2. A node is just a program—a process running on the system—that performs some useful work. For a system to be modular, this work should be as focused as possible.

-   **Single Responsibility Principle:** A well-designed node does one thing and does it well. For example, you would have one node to control a camera, another to detect faces in the camera image, and a third to count the faces.
-   **Independence:** Nodes are independent executables. They can be started, stopped, and restarted without affecting other nodes (unless those nodes depend on the data it provides).
-   **Examples of Nodes:**
    -   A hardware driver node that publishes sensor data.
    -   A perception node that processes sensor data to find objects.
    -   A planning node that decides where the robot should move.
    -   An actuator node that sends commands to the motors.

A typical robotic system is composed of many nodes working in concert.

### Communication Patterns: Topics, Services, and Actions

Nodes communicate with each other using three primary patterns. Choosing the right pattern is crucial for building a clean and efficient system.

#### 1. Topics: The Broadcast System

-   **What they are:** Topics are named buses over which nodes exchange messages. They follow a **publish-subscribe** model. One or more nodes can **publish** messages to a topic, and one or more nodes can **subscribe** to that topic to receive those messages.
-   **Analogy:** A radio station. The station (`publisher`) broadcasts a program on a specific frequency (`topic`). Anyone with a radio (`subscriber`) can tune in to that frequency to listen. The broadcaster doesn't know or care who is listening.
-   **Use Case:** Best for continuous, streaming data where the sender doesn't need a direct response.
-   **Examples:**
    -   A camera node publishing a stream of images to the `/camera/image_raw` topic.
    -   An IMU node publishing a stream of orientation data to the `/imu/data` topic.
    -   A navigation node publishing a stream of velocity commands to the `/cmd_vel` topic.

#### 2. Services: The Question-and-Answer System

-   **What they are:** Services provide a **request-reply** model of communication. A **client** node sends a single request to a **server** node and waits for a single reply. Unlike topics, this is a one-to-one, synchronous communication.
-   **Analogy:** Making a phone call to ask a question. You (`client`) dial a number (`service_name`), ask your question (`request`), and wait for the person on the other end (`server`) to give you an answer (`reply`).
-   **Use Case:** Best for short, transactional operations where a direct confirmation or result is needed.
-   **Examples:**
    -   A service `/set_led_color` that takes a color as a request and returns a `success` boolean.
    -   A service `/get_robot_status` that takes no request but returns the robot's current battery level.
    -   A service `/trigger_snapshot` that commands a camera to save a single image.

#### 3. Actions: The Long-Running Task System

-   **What they are:** Actions are for long-running, asynchronous tasks that provide continuous feedback and can be preempted (canceled). They are more complex than services. An **action client** sends a **goal** to an **action server**. The server begins executing the goal, periodically sending **feedback** to the client. When finished, it sends a final **result**. The client can also send a **cancel request** at any time.
-   **Analogy:** Ordering a pizza online. You (`action client`) place an order with specific toppings (`goal`). The pizza place (`action server`) accepts the order and provides updates on its status (`feedback`: "Preparing," "Baking," "Out for Delivery"). When the pizza arrives, you get the final pizza (`result`). You can also cancel the order (`cancel request`) before it's delivered.
-   **Use Case:** Best for any task that takes a significant amount of time and for which you want to monitor progress or have the option to cancel.
-   **Examples:**
    -   An action `/navigate_to_pose` that takes a target location as a goal, provides the robot's current distance to the goal as feedback, and returns success or failure as the result.
    -   An action `/rotate_lidar` that commands a LIDAR to spin 360 degrees.
    -   An action `/pick_object` for a robot arm.

### Under the Hood: DDS and Real-Time Constraints

-   **DDS (Data Distribution Service):** You don't need to be an expert in DDS to use ROS 2, but it's important to know it's there. DDS is an industry-standard communication protocol that ROS 2 is built on. It handles the low-level details of message serialization, network transport, and node discovery. Because ROS 2 uses this robust, commercial-grade standard, it inherits features like automatic node discovery and highly configurable networking, making it suitable for both simple projects and complex industrial systems.

-   **Real-Time Constraints:** In robotics, timing is often critical. A command to a walking robot's motor must arrive on time, every time. This is known as a **real-time** constraint. While standard ROS 2 is not "hard real-time" out of the box, its architecture and use of DDS allow it to be configured for real-time performance on systems with a real-time operating system (like RT-Linux). This is crucial for the fast and reliable control loops required in Physical AI, especially for dynamic systems like humanoids.

## Summary

In this chapter, we unpacked the core components of the ROS 2 architecture. We learned that ROS 2 systems are built from **nodes**, which are independent programs with a single responsibility. These nodes communicate using three key patterns: **topics** for streaming data, **services** for quick request/reply transactions, and **actions** for long-running, feedback-driven tasks. We also touched on the underlying **DDS** technology that powers this communication and the importance of **real-time** performance for robot control. Understanding this architecture is the first step toward reading, designing, and building complex robotic systems.

## Key Terms

-   **Computational Graph:** The network of all ROS 2 nodes in a system and the connections (topics, services, actions) between them.
-   **Topic:** A named channel for anonymous, asynchronous, many-to-many message streaming.
-   **Message:** The data structure used for sending information on a topic.
-   **Service:** A named channel for synchronous, one-to-one request/reply communication.
-   **Action:** A named channel for asynchronous, long-running tasks that provide feedback and can be canceled.
-   **DDS (Data Distribution Service):** The underlying middleware standard that ROS 2 uses for communication.

## Exercises

1.  **Categorization:** For each of the following scenarios, state whether you would use a topic, a service, or an action, and briefly explain why.
    a.  Continuously reporting the robot's battery level.
    b.  Commanding a robot arm to move to a specific joint configuration, a process that takes 10 seconds.
    c.  Turning a robot's headlight on or off.
    d.  Streaming live video from a camera.
    e.  Querying a database for the last known position of an object.
2.  **Design:** Draw a simple diagram of the computational graph for the "obstacle-avoiding mobile robot" from the previous chapter's exercise. Show the nodes and the topic(s) connecting them.
3.  **Analysis:** Why is the publish-subscribe model of topics a good fit for sensor data? What problems might you encounter if you tried to use a service to get the latest camera image?