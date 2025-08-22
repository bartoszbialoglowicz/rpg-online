import { useEffect, useState } from "react"

const useAudio = (url: string) => {
    const [audio, setAudio] = useState(new Audio(url));
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        isPlaying ? audio.play() : audio.pause();
    }, [isPlaying]);

    useEffect(() => {
        audio.addEventListener('ended', () => setIsPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setIsPlaying(false));
        }
    }, [audio]);

    const toggle = () => {
        setIsPlaying(!isPlaying)
    };

    const play = (url2?: string) => {
        audio.pause();
        setAudio(new Audio(url2 ? url2 : url));
        setIsPlaying(true);
    }

    return {isPlaying, play, toggle};
};

export default useAudio;