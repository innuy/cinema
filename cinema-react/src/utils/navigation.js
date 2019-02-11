export function navigate(history, destination){
    history.push(destination);
}

export function navigateBack(history){
    history.goBack();
}