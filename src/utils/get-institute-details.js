import secureLocalStorage from 'react-secure-storage';
import { AUTH_TOKEN_KEY } from "store/constant";

export function useInstitute(){
    return{
        getInstituteId(){
<<<<<<< HEAD
            const institute = secureLocalStorage.getItem("institute")
=======
            const institute = localStorage.getItem("institute")
            console.log(JSON.parse(institute)?.uuid,"---------------uuid----------------------------------");
>>>>>>> a8d8554387264e85ea792f13f7281cd5e0c92bd4
            return JSON.parse(institute)?.uuid
            
        },
        getInstituteMainId(){
            const institute = secureLocalStorage.getItem("institute")
            return JSON.parse(institute)?._id
        },
        getDetails(){
           const institute = secureLocalStorage.getItem("institute")
           return JSON.parse(institute)
        }
    }
}

export function useBranchId(){
<<<<<<< HEAD
      const id = secureLocalStorage.getItem("selectedBranchId")
=======
      const id = localStorage.getItem("selectedBranchId")
      console.log(id,"-----------------------------------branchid----------------------------");
      
>>>>>>> a8d8554387264e85ea792f13f7281cd5e0c92bd4
    return id
}

export function getBranchObjectId() {
    return{
        getBranchId(){
        const branch = JSON.parse(secureLocalStorage.getItem("branches"))
    return JSON.parse(branch)._id;
        }
    }
}