import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';
import RTE from '../RTE';
import service from '../../appwrite/configuration';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, reset } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const onSubmit = useCallback(async (data) => {
        try {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

            if (post) {
                if (file) {
                    await service.deleteFile(post.featuredImage);
                }
                const dbPost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const dbPost = await service.createPost({
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                    userId: userData?.$id,
                });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    }, [post, navigate, userData]);

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '') // Remove invalid characters
                .replace(/\s+/g, '-')          // Replace spaces with hyphens
                .replace(/^-+|-+$/g, '');      // Remove leading and trailing hyphens
        }
        return '';
    }, []);

    useEffect(() => {
        if (post) {
            reset({
                title: post.title,
                slug: post.slug,
                content: post.content,
                status: post.status,
            });
        }
    }, [post, reset]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
            <div className="w-2/3 px-10">
                <Input
                    label="Title:"
                    placeholder="Title"
                    className="mb-4 shadow-sm shadow-black"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug:"
                    placeholder="Slug"
                    className="mb-4 shadow-sm shadow-black"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content:" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-3">
                <Input
                    label="Featured Image:"
                    type="file"
                    className="mb-4 shadow-sm shadow-black block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer " 
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image")}
                />
                {post && post.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 bg-[#E9EFEC]"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-[#16423C]" : "bg-[#16423C] hover:bg-[#C4DAD2] shadow-md shadow-[#16423C] hover:text-black"} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
