import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { BsDoorClosed, BsCloud } from 'react-icons/bs';
import { insertItem, getImages } from '@/hooks/storageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";


const Home = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string>('');
    const [urls, setUrls] = useState<{ publicUrl: string }[]>([]);
    const [items, setItems] = useState<string[]>([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchUrls = async () => {
            const { data } = await getImages('avatars');
            setUrls(data && data.length > 0 ? data : []);
        };
        fetchUrls();
    }, []);

    var images = [
        "https://picsum.photos/1000/3000",
        "https://picsum.photos/1000/2000",
        "https://picsum.photos/3000/2000",
        "https://picsum.photos/2000/1000",
        "https://picsum.photos/3000/3000",
        "https://picsum.photos/1000/4000",
        "https://picsum.photos/3000/2000",
        "https://picsum.photos/2000/1000",
        "https://picsum.photos/2000/2000",
        "https://picsum.photos/1000/3000",
        "https://picsum.photos/1000/2000",
        "https://picsum.photos/3000/2000",
        "https://picsum.photos/2000/1000",
        "https://picsum.photos/3000/3000",
        "https://picsum.photos/1000/4000",
        "https://picsum.photos/3000/2000",
        "https://picsum.photos/2000/1000",
        "https://picsum.photos/2000/2000",
        "https://picsum.photos/1000/3000",
        "https://picsum.photos/1000/2000",
        "https://picsum.photos/3000/2000",
        "https://picsum.photos/2000/1000",
        "https://picsum.photos/3000/3000",
        "https://picsum.photos/1000/4000",
        "https://picsum.photos/3000/2000",
    ]

    useEffect(() => {
        if (file)
            setFileUrl(URL.createObjectURL(file))
    }, [file])

    const fetchMoreData = () => {
        if (items.length >= images.length) {
            setHasMore(false);
            return;
        }

        setTimeout(() => {
            setItems(items.concat(Array.from({ length: 2 }, (_, i) => `Item ${items.length + i + 1}`)));
        }, 1500);
    };

    return (
        <div id='gallery' className='h-screen overflow-y-auto p-4 w-full'>
            <Button onClick={() => console.log(urls)}>
                Teste
            </Button>
            <Button className="p-0 w-48 mx-auto">
                <Label className="w-full h-full cursor-pointer p-2 flex items-center justify-center" htmlFor="fileInput">Upload Photo</Label>
            </Button>

            <Input type="file" id="fileInput" className="hidden" onChange={(e) => {
                setFile(e.target.files?.[0] ? e.target.files[0] : file)
            }} />

            <div className={file ? 'mx-auto max-w-[1050px] w-full flex flex-col gap-2' : 'hidden'}>
                <AspectRatio ratio={16 / 9}>
                    <img src={fileUrl} className='h-full w-full rounded-md object-cover' alt="" />
                </AspectRatio>
                <div className="flex flex-row justify-between px-6 items-center">
                    <h1>{file?.name}</h1>
                    <div className="flex gap-2">
                        <Button variant='ghost' size='icon' onClick={() => { setFile(null) }}><BsDoorClosed /></Button>
                        <Button variant='ghost' size='icon' onClick={() => {
                            insertItem('avatars', file?.name ? file.name : '', file ? file : new File([], ''))
                        }}><BsCloud /></Button>
                    </div>
                </div>
            </div>

            <InfiniteScroll
                className='py-6'
                scrollableTarget="gallery"
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
            >
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4, 1100: 5 }}>
                    <Masonry gutter="28px" >
                        {urls.map((image, index) => (
                            <img alt=""
                                src={image.publicUrl}
                                loading='lazy'
                                className='rounded-xl w-full block max-h-96 object-cover cursor-pointer'
                                key={index} />
                        ))}
                    </Masonry>

                </ResponsiveMasonry>
            </InfiniteScroll>
        </div>
    );
};

export default Home;