const updatePlace = async (req, res, next) => {
  const error = validationResult(req); //validator
  if (!error.isEmpty()) {
    throw new HttpError(
      "unable to update your data,,invalid input passed, please check your data ",
      422
    );
  }
  const {
    title,
    description,
    category,
    city,
    link,
    long,
    id,
    image
  } = req.body;
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "we can not update your Place details, sorry ",
      500
    );
    return next(error);
  }

  //checking by if statement that if we have a file only then to execute this
  if (req.files) {
    const file = req.files.photo; // initializing file with the photo we got from the frontend
    let imageUrl = null;

    //Uploading image to the cloudinary
    cloudinary.uploader
      .upload(file.tempFilePath, (error, result) => {
        if (error) {
          //logging the error here
          console.log("Error", error);
        } else {
          //If we successfully uploaded the image then we are setting that cloudinary image url
          imageUrl = result.url;
        }
      })
      .then(() => {
        //Here we have to wait for the above code to be executed and then to execute this part
        //after successfully uploading the image to cloudinary and after setting that url to imageUrl we are ready to update the fields
        place.title = title;
        place.description = description;
        place.city = city;
        place.link = link;
        place.long = long;
        place.category = category;
        //here again making sure that only update the image if we have imageUrl
        if (imageUrl) {
          place.image = imageUrl;
        }
        place
          .save()
          .then(() => {
            res.status(200).json({ place: place.toObject({ getters: true }) });
          })
          .catch(error => {
            res.json({ error });
          });
      });
  } else {
    //If we dont got image from the frontend that means we just have to update other fields but not image field
    place.title = title;
    place.description = description;
    place.city = city;
    place.link = link;
    place.long = long;
    place.category = category;
    place
      .save()
      .then(() => {
        res.status(200).json({ place: place.toObject({ getters: true }) });
      })
      .catch(error => {
        res.json({ error });
      });
  }
};
