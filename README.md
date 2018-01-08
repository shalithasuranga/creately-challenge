#Find Outline Challenge

## How the solution works

 - Download as zip or clone the repo.
 - Open `index.html` with your browser.
 - Click `Draw Object` or `Draw Image` to draw simple object on the left canvas.  
 - Click `Draw Outline` to Render outline on both canvases.
 - Eventually click `Reset` to start again
 
 
 ## How it works
 
 This solution uses simple edge detection algorithm with `3x3` filter mask.
 
 ### Pseudo Code
 
 ```
 Begin
 Check each pixel of input image
  If mask applies (if at least one pixel hits excluding the middle pixel) put 1 in the resultant array for all applied pixels
  Repeat until all image is scanned
 Render the resultant array as stroke on both canvases
 End
 ```
