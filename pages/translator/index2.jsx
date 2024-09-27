
export default function Component() {
    return (
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">How to Sign the Letter {"'"}A{""} in ASL</h1>
            <p className="text-gray-600 mb-6">
              Follow these simple steps to sign the letter {"'"}A{""} in American Sign Language:
            </p>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <h3 className="font-semibold mb-2">Start with your hand open</h3>
                <p>Begin by holding your hand with your palm facing outward and your fingers extended.</p>
              </li>
              <li>
                <h3 className="font-semibold mb-2">Fold your index finger</h3>
                <p>Gently fold your index finger down, keeping the rest of your fingers straight.</p>
              </li>
              <li>
                <h3 className="font-semibold mb-2">Hold the position</h3>
                <p>Hold this position with your index finger folded and the rest of your hand open.</p>
              </li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Try it Yourself</h2>
            <div className="bg-gray-100 rounded-lg p-6">
            <div className="p-4 w-full text-center" >
          <Webcam audio={false} ref={webcamRef}  />
          <canvas ref={canvasRef} className="signlang_canvas rounded-md" />
          <div className="signlang_data-container">
            <button className="px-6 py-2 text-lg font-semibold text-white w-1/2  bg-neutral-500 rounded-lg hover:bg-neutral-700" onClick={enableCam}>{webcamRunning ? "Stop" : "Start Lesson"}</button>
            <div className="signlang_data">
              <p className="gesture_output">{gestureOutput}</p>
              <ProgressBar completed={progress} bgColor="#00FF00" />
              </div>
            </div>
          </div>
        </div>
        <div className="signlang_imagelist-container">
          <h2 className="gradient__text">Image</h2>
          <div className="signlang_image-div">
            {currentImage ? (
              <Image src={currentImage.url} alt={`Image of sign ${currentImage.id}`} width={100} height={100} />
            ) : (
              <h3 className="gradient__text">Click on the Start Button <br /> to practice with Images</h3>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
              <span className="text-sm font-medium">1</span>
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted cursor-pointer hover:bg-muted-foreground hover:text-muted-foreground">
              <span className="text-sm font-medium">2</span>
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted cursor-pointer hover:bg-muted-foreground hover:text-muted-foreground">
              <span className="text-sm font-medium">3</span>
            </div>
          
              <p className="text-gray-600 mt-4">Use the camera to display your hand signing the letter {"'"}A{""} in ASL.</p>
            </div>
          </div>
        </div>
    
    )
  }