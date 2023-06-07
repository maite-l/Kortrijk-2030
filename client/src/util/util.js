export function fileInputChange(event, maxImgCount, maxImgSizeInMb) {

    //reset variables
    const imgNames = [];
    const imgStrings = [];

    //check if files are valid
    //check if there are too many files
    if (event.target.files.length > maxImgCount) {
        alert(`You can only upload a maximum of ${maxImgCount} images`);
        event.target.value = null;
        return;
    }
    else {
        //check if files are too large
        for (let i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i].size > maxImgSizeInMb * 1024 * 1024) {
                alert(`One or more of your images is too large. Please limit your image size to ${maxImgSizeInMb}MB`);
                return;
            }
            else {
                //if files are valid, read them...
                const file = event.target.files[i];
                const reader = new FileReader(); // -> web api

                //... and when done reading...
                reader.onloadend = () => {
                    const base64String = reader.result;
                    const filename = event.target.files[i].name;

                    console.log(base64String);
                    console.log(filename);

                    //... update variables
                    imgNames.push(filename);
                    imgStrings.push(base64String);

                    console.log(imgNames);
                    console.log(imgStrings);
                };

                reader.readAsDataURL(file);
            }
        }
    }
    return { imgNames, imgStrings };
}