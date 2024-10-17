// animations.js
import { keyframes } from '@mui/system';

export const HideAndViewAnimation = keyframes`
  0%, 100% {
    opacity: 1;
    transform: translateX(0%);
  }
  50% {
    opacity: 0;
    transform: translateX(100%);
  }
  70% {
    opacity: 0;
    transform: translateX(-100%);
  }
`;
