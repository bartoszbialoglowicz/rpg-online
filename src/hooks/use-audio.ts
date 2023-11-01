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
    }, []);

    const toggle = () => {
        setIsPlaying(!isPlaying)
    };

    return {isPlaying, toggle};
};

export default useAudio;