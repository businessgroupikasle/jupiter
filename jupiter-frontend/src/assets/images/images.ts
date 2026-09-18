/**
 * Centralized Image Registry for Jupiter Industries Website.
 *
 * You can place images inside `public/images/` or `src/assets/images/`
 * and change the paths below anytime.
 */

import heroBanner1 from './hero-banner1.png';
import jupiterLogo from './jupiter-logo.png';
import flyashMachine from './Machines/flyash.png';
import performanceMachineImg from './Machines/performance-machine.jpg';
import isoCertImg from './about/iso certification.jpg';

export const IMAGES = {
  // Brand Logo
  logo: jupiterLogo,

  // ISO Certification
  isoCertification: isoCertImg,

  // Hero section image
  heroBanner: heroBanner1,
  
  // Products & Applications
  concreteBlocks: '/images/concrete-blocks.jpg',
  flyAshBricks: '/images/fly-ash-bricks.jpg',
  paverBlocks: '/images/paver-blocks.jpg',
  batchingPlants: '/images/batching-plants.jpg',
  
  // Plant & Success Story
  successPlant: '/images/arunachala-plant.jpg',
  performanceMachine: performanceMachineImg,
  flyAshMachine: flyashMachine,
  
  // Industries
  construction: '/images/industry-construction.jpg',
  infrastructure: '/images/industry-infrastructure.jpg',
  precast: '/images/industry-precast.jpg',
  realEstate: '/images/industry-real-estate.jpg',
};
