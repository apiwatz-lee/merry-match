import { useEffect, useContext } from "react";
import { useFormikContext } from "formik";
import { FormContext } from "../../pages/RegisterPage.jsx";
function ProfilePicturesForm() {
  const { picturesProfile, setPicturesProfile } = useContext(FormContext);
  const formik = useFormikContext();

  const handleFileChange = (event, index) => {
    const uniqueId = Date.now();
    const tmpPicturesProfile = [...picturesProfile];
    tmpPicturesProfile.splice(index, 1, { [uniqueId]: event.target.files[0] });
    setPicturesProfile([...tmpPicturesProfile]);
  };

  useEffect(() => {
    const tmpPicturesProfile = [...picturesProfile].filter(
      (picture) => picture !== null
    );
    formik.setFieldValue("profilePictures", tmpPicturesProfile);
  }, [picturesProfile]);

  function renderPicture(isPicture, index, url) {
    if (isPicture) {
      return (
        <div
          key={index}
          className="w-[167px] h-[167px] bg-gray-200 rounded-2xl flex flex-col justify-center items-center space-y-2 overflow-hidden"
        >
          <img src={url} className="w-[167px] h-[167px] object-cover" />
        </div>
      );
    } else {
      const inputId = `upload-${index}`;
      return (
        <label
          key={index}
          htmlFor={inputId}
          className="w-[167px] h-[167px] bg-gray-200 rounded-2xl flex flex-col justify-center items-center space-y-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M12.5 4.5V19.5M20 12H5"
              stroke="#7D2262"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-purple-600 text-sm font-medium">Upload photo</p>
          <input
            id={inputId}
            name="avatar"
            type="file"
            onChange={(event) => handleFileChange(event, index)}
            hidden
          />
        </label>
      );
    }
  }

  return (
    <div className="w-[930px] flex flex-col justify-start items-start font-nunito">
      <p className="text-purple-500 text-2xl font-bold">Profile Pictures</p>
      <p className="text-gray-800  text-base font-normal mt-1">
        Upload at least 2 photos
      </p>
      <div className="w-full flex flex-row mt-6 justify-center space-x-6">
        {picturesProfile.map((element, index) => {
          if (element !== null) {
            return renderPicture(
              true,
              index,
              URL.createObjectURL(element[Object.keys(element)[0]])
            );
          } else {
            return renderPicture(false, index);
          }
        })}
      </div>
    </div>
  );
}

export default ProfilePicturesForm;
