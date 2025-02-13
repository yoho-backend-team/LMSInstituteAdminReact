import secureLocalStorage from 'react-secure-storage';
import { AUTH_TOKEN_KEY } from 'store/constant';

export function useInstitute() {
  return {
    getInstituteId() {
      const institute = secureLocalStorage.getItem('institute');

      return JSON.parse(institute)?.uuid;
    },
    getInstituteMainId() {
      const institute = secureLocalStorage.getItem('institute');
      return JSON.parse(institute)?._id;
    },
    getDetails() {
      const institute = secureLocalStorage.getItem('institute');
      return JSON.parse(institute);
    }
  };
}

export function useBranchId() {
  const id = secureLocalStorage.getItem('selectedBranchId');
  return id;
}

export function getBranchObjectId() {
  return {
    getBranchId() {
      const branch = JSON.parse(secureLocalStorage.getItem('branches'));
      return JSON.parse(branch)._id;
    }
  };
}
