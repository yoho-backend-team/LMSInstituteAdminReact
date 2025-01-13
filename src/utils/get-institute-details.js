import { AUTH_TOKEN_KEY } from "store/constant";

export function useInstitute(){
    return{
        getInstituteId(){
            const institute = localStorage.getItem("institute")
            return JSON.parse(institute)?.uuid
        },
        getInstituteMainId(){
            const institute = localStorage.getItem("institute")
            return JSON.parse(institute)?._id
        },
        getDetails(){
           const institute = localStorage.getItem("institute")
           return JSON.parse(institute)
        }
    }
}

export function useBranchId(){
      const id = localStorage.getItem("selectedBranchId")
    return id

}

export function getBranchObjectId() {
    return{
        getBranchId(){
        const branch = JSON.parse(localStorage.getItem("branches"))
    return JSON.parse(branch)._id;
        }
    }
    
}
