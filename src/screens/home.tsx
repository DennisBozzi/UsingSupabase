import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BsDoorClosed, BsCloud } from 'react-icons/bs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ImageComponent } from '@/components/imageComponent';
import { insertItem, getImagesUrls, hasMore } from '@/hooks/storageProvider';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Label } from '@/components/ui/label';

const Home = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string>('');
    const [urls, setUrls] = useState<any[]>([]);

    const fetchUrls = async (quantity: number) => {
        const { data } = await getImagesUrls('gallery', urls.length, quantity);
        setUrls(data ? [...urls, ...data] : [...urls, ...[]]);
    }

    useEffect(() => {
        fetchUrls(36)
        if (file)
            setFileUrl(URL.createObjectURL(file))
    }, [file])

    return (
        <div id='gallery' className='h-screen overflow-y-auto px-2 sm:px-4 py-4 w-full flex flex-col items-center'>
            <canvas id='canvas' className='hidden' />
            <Button onClick={() => { fetchUrls(5) }}>
                Fetch Images
            </Button>
            <Button onClick={() => { setUrls([]), console.clear() }}>
                Clear Images
            </Button>
            <Button className="p-0 w-48 mx-auto">
                <Label className="w-full h-full cursor-pointer p-2 flex items-center justify-center" htmlFor="fileInput">
                    Upload Photo
                </Label>
            </Button>

            <div>
                <div className={file ? 'mx-auto max-w-[1050px] w-full flex flex-col gap-2' : 'hidden'}>
                    <AspectRatio ratio={16 / 9}>
                        <img src={fileUrl} className='h-full w-full rounded-md object-cover' alt="" />
                    </AspectRatio>
                    <div className="flex flex-row justify-between px-6 items-center">
                        <h1>{file?.name}</h1>
                        <div className="flex gap-2">
                            <Button variant='ghost' size='icon' onClick={() => { setFile(null) }}><BsDoorClosed /></Button>
                            <Button variant='ghost' size='icon' onClick={() => {
                                insertItem('gallery', file?.name ? file.name : '', file ? file : new File([], ''))
                            }}><BsCloud /></Button>
                        </div>
                    </div>
                </div>

                <Input type="file" id="fileInput" className="hidden" onChange={(e) => {
                    setFile(e.target.files?.[0] ? e.target.files[0] : file)
                }} />
            </div>

            {/* ------------------------------------------------------------------------------- */}

            <div className='flex gap-6 p-2 w-full'>

                <InfiniteScroll
                    dataLength={urls.length}
                    next={() => fetchUrls(8)}
                    scrollableTarget='gallery'
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    className='flex flex-wrap gap-6 p-2'
                    endMessage={<h4 className='w-full text-center'>Finish</h4>}
                >
                    {urls.map((url, index) => (
                        <ImageComponent key={index} obj={url} />
                    ))}
                </InfiniteScroll>
            </div>

            {/* ------------------------------------------------------------------------------- */}


        </div >
    );
};

export default Home;