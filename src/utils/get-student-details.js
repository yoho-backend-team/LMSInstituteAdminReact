import secureLocalStorage from 'react-secure-storage';
import { AUTH_TOKEN_KEY } from 'store/constant';

export function useStudent() {
  return {
    getStudentId() {
      const student = secureLocalStorage.getItem('student');

      console.log('studentUUID :', student?.uuid);
      return JSON.parse(student)?.uuid;
    },
    getStudentMainId() {
      const student = secureLocalStorage.getItem('student');
      return JSON.parse(student)?._id;
    },
    getDetails() {
      const student = secureLocalStorage.getItem('student');
      console.log('studentUUID :', JSON.stringify(student));

      return JSON.parse(student);
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
