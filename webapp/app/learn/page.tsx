'use client'

import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { ArrowLeftIcon, ArrowRightIcon, CameraIcon, VideoIcon, VideoOffIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const words: { letter: string, sign: string }[] = [
  { letter: "A", sign: "/game/signA-A.png" },
  { letter: "B", sign: "/game/signB-B.png" },
  { letter: "C", sign: "/game/signC-C.png" },
  { letter: "D", sign: "/game/signD-D.png" },
  { letter: "E", sign: "/game/signE-E.png" },
]


export default function Learn() {
  const webcamRef = useState<Webcam>
  const canvasRef = useRef<HTMLCanvasElement>;

  const [video, setVideo] = useState<boolean>(false);
  const [mirrored, setMirrored] = useState<boolean>(true);
  const [sign, setSign] = useState<string>("A");

  const path = `/game/${sign}`;

  return (
    <div className="max-container py-12 bg-white">
      <div className="flex flex-row gap-x-12 items-center justify-center min-h-[600px]">
        <div className="flex flex-col items-center justify-center border border-gray-200 shadow-lg rounded-lg w-[600px] h-[600px] bg-gray-100">
          <div className="w-full h-full items-center justify-center">
            {sign &&
              <Image
                src={words.find((word) => word.letter === sign).sign}
                alt={sign}
                width={600}
                height={600}
                className="object-contain p-2"
              />
            }
          </div>

          <div className='flex flex-row gap-x-3 h-12 mb-6'>
            <Button>
              <ArrowLeftIcon className="w-[50px] h-[50px]" />
            </Button>
            {sign && (words.map((word) => (
              <Button
                key={word.letter}
                onClick={() => setSign(word.letter)}
              >
                {word.letter}
              </Button>))
            )}
            <Button>
              <ArrowRightIcon className="w-[50px] h-[50px]" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border border-gray-200 shadow-lg rounded-lg w-[600px] h-[600px] bg-gray-100">
          <div className="w-full h-full items-center justify-center">
            {video ? (
              <Webcam
                open={video}
                mirrored={mirrored}
                className="h-full w-full object-contain p-2"
              />
            ) : (
              <canvas ref={canvasRef} className="h-full w-full object-contain p-2" />
            )
            }
          </div>
          <div className="flex flex-row items-center justify-center h-12 mb-6">
            <Button>
              <CameraIcon className="w-[50px] h-[50px]" />
            </Button>

            <Button
              onClick={() => {
                setVideo((video) => !video)
              }}>
              {video ? (
                <VideoIcon className="w-[50px] h-[50px]" />)
                : (
                  <VideoOffIcon className="w-[50px] h-[50px]" />)
              }
            </Button>

          </div>
        </div>
      </div>
    </div >
  )
}

