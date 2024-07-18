

export const getChangedFields = (original,updated) => {
    let changes = {}
    changes.is_changed = false
    for(let [key,value] of Object.entries(updated)){
        if(original[key] !== updated[key]&&typeof(value)!=="object"){
            changes[key] = updated[key]
            if(!changes.is_changed){
                changes.is_changed = true
            }
        }else if(typeof(value)==="object"){
            const nestedChanges = getChangedFields(original[key],value)
            if(Object.keys(nestedChanges).length === 0 ){
                if(!changes.is_changed){
                    changes.is_changed = true
                }
            } 
            changes[key] = value
        }
    }
    return changes
}