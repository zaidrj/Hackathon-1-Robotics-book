import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  defaultSidebar: [
    'preface',

    {
      type: 'category',
      label: 'PART 1: FOUNDATIONS OF PHYSICAL AI',
      collapsed: false,
      items: [
        'part-1-foundations/intro',
        'part-1-foundations/humanoid-landscape',
        'part-1-foundations/sensors-overview',
      ],
    },

    {
      type: 'category',
      label: 'PART 2: ROS 2 (ROBOTIC NERVOUS SYSTEM)',
      collapsed: false,
      items: [
        'part-2-ros2/intro',
        'part-2-ros2/ros2-architecture',
        'part-2-ros2/python-nodes',
        'part-2-ros2/urdf-humanoids',
      ],
    },

    {
      type: 'category',
      label: 'PART 3: DIGITAL TWIN (GAZEBO & UNITY)',
      collapsed: false,
      items: [
        'part-3-digital-twin/intro',
        'part-3-digital-twin/gazebo-physics',
        'part-3-digital-twin/unity-visualization',
      ],
    },

    {
      type: 'category',
      label: 'PART 4: NVIDIA ISAAC PLATFORM',
      collapsed: false,
      items: [
        'part-4-isaac/intro',
        'part-4-isaac/isaac-sim',
        'part-4-isaac/isaac-ros-nav2',
      ],
    },

    {
      type: 'category',
      label: 'PART 5: VISION–LANGUAGE–ACTION (VLA)',
      collapsed: false,
      items: [
        'part-5-vla/intro',
        'part-5-vla/voice-to-action',
        'part-5-vla/llm-planning',
      ],
    },

    {
      type: 'category',
      label: 'PART 6: CAPSTONE & LAB',
      collapsed: false,
      items: [
        'part-6-capstone/autonomous-humanoid',
        'hardware-and-labs',
      ],
    },

    {
      type: 'category',
      label: 'PART 7: PROJECTS & ASSESSMENTS',
      collapsed: false,
      items: [
        'part-7-projects/intro',
        'part-7-projects/weekly-breakdown',
        'part-7-projects/assessments',
      ],
    },
  ],
};

export default sidebars;