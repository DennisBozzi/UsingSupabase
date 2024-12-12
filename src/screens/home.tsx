import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { BsDoorClosed, BsCloud } from 'react-icons/bs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { insertItem, getImagesUrls } from '@/hooks/storageProvider';
import { ImageComponent } from '@/components/imageComponent';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string>('');
    const [urls, setUrls] = useState<any[]>([]);
    const [displayedUrls, setDisplayedUrls] = useState<any[]>([]);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        const fetchUrls = async () => {
            const { data } = await getImagesUrls('gallery');
            setUrls(data && data.length > 0 ? data : []);
        };
        fetchUrls();
    });

    useEffect(() => {
        if (file)
            setFileUrl(URL.createObjectURL(file))
    }, [file])

    const fetchMoreImages = () => {
        setPage((prevPage) => {
            const page = prevPage + 1;
            const newUrls = urls.slice(prevPage * 10, page * 10);
            setDisplayedUrls([...displayedUrls, ...newUrls]);
            return page;
        });
    };

    return (
        <div className='h-screen overflow-y-auto p-4 w-full'>
            <canvas id='canvas' className='hidden' />
            <Button onClick={() => fetchMoreImages()}>
                Teste
            </Button>
            <Button onClick={() => { setDisplayedUrls([]), setPage(0), console.clear() }}>
                Teste
            </Button>
            <Button className="p-0 w-48 mx-auto">
                <Label className="w-full h-full cursor-pointer p-2 flex items-center justify-center" htmlFor="fileInput">
                    Upload Photo
                </Label>
            </Button>

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

            {/* ------------------------------------------------------------------------------- */}

            <div id='gallery' className='flex flex-wrap gap-6 p-2'>

                <InfiniteScroll
                    dataLength={displayedUrls.length}
                    next={fetchMoreImages}
                    hasMore={displayedUrls.length < urls.length}
                    loader={<h4>Loading...</h4>}
                    className='flex flex-wrap gap-6 p-2'
                >
                    {displayedUrls.map((url, index) => (
                        <ImageComponent key={index} hash={url.blurHash} src={url.publicUrl} />
                    ))}
                </InfiniteScroll>
            </div>

            {/* ------------------------------------------------------------------------------- */}


        </div >
    );
};

export default Home;