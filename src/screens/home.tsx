import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { BsDoorClosed, BsCloud } from 'react-icons/bs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { insertItem, getImagesUrls } from '@/hooks/storageProvider';
import { ImageComponent } from '@/components/imageComponent';
import { Blurhash } from 'react-blurhash';

const Home = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string>('');
    const [urls, setUrls] = useState<any[]>([]);

    useEffect(() => {
        const fetchUrls = async () => {
            const { data } = await getImagesUrls('gallery');
            setUrls(data && data.length > 0 ? data : []);
        };
        fetchUrls();
    }, []);

    useEffect(() => {
        if (file)
            setFileUrl(URL.createObjectURL(file))
    }, [file])

    return (

        <div id='gallery' className='h-screen overflow-y-auto p-4 w-full'>
            <canvas id='canvas' className='hidden' />
            <Button onClick={() => console.log(urls)}>
                Teste
            </Button>
            <Button className="p-0 w-48 mx-auto">
                <Label className="w-full h-full cursor-pointer p-2 flex items-center justify-center" htmlFor="fileInput">
                    Upload Photo
                </Label>
            </Button>

            <Input type="file" id="fileInput" className="hidden" onChange={(e) => {
                setFile(e.target.files?.[0] ? e.target.files[0] : file)
            }} />

            <div className='flex flex-wrap'>
                {
                    urls.length > 0 && urls.map((url: any, i: number) => {
                        return (
                            <ImageComponent key={i} src={url.publicUrl} hash={url.blurHash} />
                        );
                    })
                }
            </div>

            {/* ------------------------------------------------------------------------------- */}
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

        </div>
    );
};

export default Home;