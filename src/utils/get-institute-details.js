import { AUTH_TOKEN_KEY } from "store/constant";

export function useInstitute(){
    return{
        getInstituteId(){
            const institute = localStorage.getItem("institute")
            return JSON.parse(institute).uuid
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