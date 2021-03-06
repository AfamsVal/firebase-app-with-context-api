import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/GlobalState";

const POST = [
  {
    id: 1,
    title: "Post 1",
    body: "This is post 1",
    image: "https://picsum.photos/200/200",
  },
  {
    id: 2,
    title: "Post 2",
    body: "This is post 2",
    image: "https://picsum.photos/200/200",
  },
];

const Gallery = () => {
  const { store } = useUserAuth();

  const [imagesUpload, setImagesUpload] = useState(null);
  const [posts, setPosts] = useState(POST);
  const [percentage, setPercentage] = useState(0);

  const uploadImages = () => {
    if (imagesUpload === null) return;
    // const fileName = new Date().getTime() + imagesUpload.name
    const imageRef = ref(storage, `images/${v4() + imagesUpload.name}`);
    const uploadTask = uploadBytesResumable(imageRef, imagesUpload);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercentage(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(imageRef)
          .then((url) => {
            console.log("Image uploaded");
            setPosts((prevPosts) => [
              ...prevPosts,
              {
                id: prevPosts.length + 1,
                title: "New Post",
                body: "This is post 3",
                image: url,
              },
            ]);
          })
          .catch((err) => {
            console.log("Err url::", err);
          });
      }
    );
  };

  return store?.isAuth ? (
    <Layout>
      <div className="row">
        <div className="col-md-12 mt-4">
          <h1>Gallery</h1>

          <div className="row">
            <div className="col-md-12 my-4">
              <div className="form-group mb-4">
                <label className="d-block mb-2">Please select file:</label>
                <input
                  type="file"
                  className="form-control-file border"
                  onChange={(e) => setImagesUpload(e.target.files[0])}
                />
                <div className="mt-3">
                  <button className="btn btn-info" onClick={uploadImages}>
                    <i className="fa fa-upload"></i> Upload Image
                  </button>
                  {percentage > 0 && (
                    <strong className="px-3">{percentage}%</strong>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            {posts.map((post) => (
              <div key={post.id} className="col-md-3">
                <div className="card">
                  <img src={post.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <Navigate to="/login"></Navigate>
  );
};

export default Gallery;
