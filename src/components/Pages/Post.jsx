import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/configuration";
import Button from "../Button";
import Container from "../container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePosts = async () => {
        try {
            const success = await appwriteService.deletePost(post.$id);
            if (success) {
                if (post.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
                }
                navigate("/");
            } else {
                console.error("Failed to delete post");
                navigate('/')
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };
    

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border-black rounded-xl p-4 px-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl h-80 w-2/6 shadow-lg shadow-[#C4DAD2]"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-[#16423C]" className="mr-3 w-28 hover:bg-[#457d69] hover:text-black shadow-md shadow-black">
                                    Edit
                                </Button>
                            </Link>
                       <button onClick={deletePosts} className="mr-3 w-28 bg-red-900 text-white h-10 shadow-md shadow-black rounded-sm hover:bg-red-700">
                        Delete
                        </button></div>)}
                </div>
                <div className="w-full mb-6 mt-10 ml-10 text-pretty ">
                    <h1 className="text-4xl font-bold text-pretty "><u>{post.title}</u></h1>
                </div>
                <div className="browser-css text-2xl ml-10">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}