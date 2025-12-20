---
title: "Chapter 8: Describing the Robot - URDF"
sidebar_label: "CHAPTER 8: DESCRIBING THE ROBOT - URDF"
---

# Chapter 8: Describing the Robot - URDF

## Learning Objectives

By the end of this chapter, you will be able to:
-   **Explain** the purpose of URDF for robot modeling.
-   **Identify** and describe the two core components of a URDF file: `<link>` and `<joint>`.
-   **Read** a simple URDF file and visualize the kinematic tree it represents.
-   **Recognize** common pitfalls and limitations when using URDF for humanoid robots.

## Introduction

So far, we have treated the robot as an abstract collection of nodes. But a Physical AI is an *embodied* agent. We need a way to describe the robot's physical structure: its shape, its moving parts, and how they are all connected. In ROS, the standard for this is the **Unified Robot Description Format (URDF)**.

URDF is an XML-based file format used to model the kinematic and dynamic properties of a robot. It allows us to create a digital twin of the robot that can be used for simulation, visualization, and planning.

## Main Sections

### URDF Fundamentals: A Tree of Links and Joints

At its core, a URDF file describes a robot as a **tree structure**. It is composed of two fundamental building blocks: `<link>` and `<joint>`.

-   **`<link>`:** A link represents a rigid body part of the robot. It has physical properties like mass, inertia, and visual and collision geometries.
    -   Think of the bones in a skeleton: the upper arm, the forearm, the hand, the torso. Each of these would be a separate `<link>`.
-   **`<joint>`:** A joint connects two links together and defines how one link can move relative to another.
    -   Think of the joints in a skeleton: the shoulder, the elbow, the wrist.

Crucially, a URDF must be a **tree**. This means it has one root link (like the robot's torso or base), and every other link is connected via a chain of joints. There can be no loops in the model.

### Anatomy of a URDF File

Let's look at the key tags you'll find inside a URDF file.

#### The `<link>` Tag

A link is defined by its physical characteristics.
```xml
<link name="upper_arm_link">
  <inertial>
    <mass value="1.0" />
    <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.01" />
  </inertial>
  <visual>
    <geometry>
      <cylinder length="0.5" radius="0.1" />
    </geometry>
  </visual>
  <collision>
    <geometry>
      <cylinder length="0.5" radius="0.1" />
    </geometry>
  </collision>
</link>
```
-   `<inertial>`: Defines the dynamic properties, like mass and the inertia tensor, which are crucial for physics simulation.
-   `<visual>`: Defines what the link looks like for visualization (e.g., in Rviz). This can be a simple shape (box, cylinder, sphere) or a 3D mesh file (like `.stl` or `.dae`).
-   `<collision>`: Defines the geometry used by the physics engine for collision detection. This is often a simpler version of the visual geometry to speed up computation.

#### The `<joint>` Tag

A joint describes the connection between a `parent` link and a `child` link.
```xml
<joint name="shoulder_joint" type="revolute">
  <parent link="torso_link" />
  <child link="upper_arm_link" />
  <origin xyz="0.0 0.2 0.5" rpy="0.0 0.0 0.0" />
  <axis xyz="0 1 0" />
  <limit lower="-1.57" upper="1.57" effort="100" velocity="1.0" />
</joint>
```
-   `type`: The most important attribute. It defines the type of motion allowed.
    -   `revolute`: A hinge joint that rotates around a single axis (like an elbow).
    -   `continuous`: A revolute joint with no angle limits (like a wheel).
    -   `prismatic`: A sliding joint that moves along an axis (like a piston).
    -   `fixed`: A rigid connection that allows no movement. Used to attach parts that don't move relative to each other (like a camera to a robot's head).
-   `<parent>` and `<child>`: Defines the two links being connected.
-   `<origin>`: Specifies the position and orientation of the child link relative to the parent link. This defines the joint's location.
-   `<axis>`: For revolute or prismatic joints, this specifies the axis of motion.
-   `<limit>`: For revolute and prismatic joints, this defines the motion limits (e.g., minimum and maximum angles for an elbow) and maximum effort (force/torque) and velocity.

### Modeling Humanoid Kinematics

When we model a humanoid, we create a chain of links and joints that mirrors the human skeleton. This is called the **kinematic chain**.

-   The **torso** or **pelvis** is typically chosen as the **root link**.
-   From the torso, we define joints and links for the spine, head, and each arm (e.g., `torso` -> `shoulder` -> `upper_arm` -> `elbow` -> `forearm` -> `wrist` -> `hand`).
-   From the pelvis, we define joints and links for each leg (e.g., `pelvis` -> `hip` -> `thigh` -> `knee` -> `shin` -> `ankle` -> `foot`).

By describing this entire structure in a URDF file, we give ROS the information it needs to perform **forward kinematics**—calculating the position of any link in space (e.g., the hand) given the angles of all the joints—and **inverse kinematics**—calculating the required joint angles to place the hand in a desired position.

### Common URDF Pitfalls and Limitations

URDF is powerful, but it has limitations, especially for complex robots like humanoids.
-   **No Loops (Tree Structure Only):** A URDF cannot model a "closed-loop" chain. For example, you cannot model a four-bar linkage or both hands grasping the same object. This is a fundamental limitation. The more advanced **SDF (Simulation Description Format)** used by the Gazebo simulator can handle loops.
-   **Simplified Physics:** The collision models are often simplified, and complex physical phenomena like friction or material deformation are not well-represented.
-   **No Actuator Modeling:** URDF describes the *kinematics* (motion) but doesn't have a standard way to model the *actuators* themselves (e.g., motors, gears, transmissions). This information is typically handled by separate robot-specific configuration files.
-   **Human-Unfriendly:** Writing and debugging large XML files by hand is tedious and error-prone. This has led to the development of tools like **Xacro (XML Macros)**, which allow you to create URDFs using templates, variables, and mathematical expressions, making the process much more manageable.

## Summary

In this chapter, we learned how to describe the physical structure of a robot using the Unified Robot Description Format (URDF). We saw that a URDF model is a tree of **links** (rigid bodies) and **joints** (which define motion). We explored the anatomy of the `<link>` and `<joint>` tags and understood how they are used to define a robot's visual appearance, collision properties, and kinematic chain. Finally, we discussed the limitations of URDF, particularly its tree-structure constraint, and acknowledged common pitfalls. This digital description is the essential link between our software and the robot's physical embodiment, enabling simulation, visualization, and intelligent planning.

## Key Terms

-   **URDF (Unified Robot Description Format):** An XML format for representing a robot model.
-   **Link:** A rigid body part of a robot in a URDF model.
-   **Joint:** A connection between two links that defines their relative motion.
-   **Kinematic Chain:** A sequence of links and joints connecting one part of a robot to another.
- a**Kinematic Tree:** The full, branching structure of a robot's kinematic chains, starting from a single root link.
-   **Xacro (XML Macros):** A macro language that simplifies the creation of complex URDF files.

## Exercises

1.  **Conceptual:** Draw a simple kinematic tree (using boxes for links and circles for joints) for a robot arm with a shoulder, elbow, and wrist. Label the root link, the parent/child relationships, and the joint types.
2.  **Analysis:** Why is it useful to have separate `<visual>` and `<collision>` tags within a `<link>`? Why not just use the visual model for everything?
3.  **Design:** You need to add a fixed, non-moving camera to the head of a humanoid model. How would you represent this in URDF? What would the joint type be?
4.  **Problem-Solving:** Your team has built a robot with two arms, and they want to simulate the robot holding a large box with both hands. Why will this be a problem for a standard URDF model?