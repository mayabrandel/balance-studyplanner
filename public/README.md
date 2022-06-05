# Balance-studyplanner STUDBUD

** Please note that between github commits I was working in another project file and copying the whole file back into here as I had trouble viewing the console with this project file that had node.js included. So to debug I was using another project folder without node.js :)

## ITERATION and IMPROVEMENT

### Website Layout

#### First iteration

Following the mock ups the layout of the website was first coded to include a nav bar and have two HTML pages for the user to go betweeen. Below are the mock ups and the first coded layout of the website following closely to the mockups. 
<img src="images\Homepage.png" width="385px">
<img src="images\navigation.JPG" width="800px">


However through the process of further iterating the website issues were found in the tasks disappearing when changing pages so a new iteration was designed to fit a one page layout with only the necessary functions.

#### Second iteration

Sketches were produced to flesh out the new layout idea of merging the two previous pages. Aspects of the website were taken out including the calendar and the statistics aspect (seen in the homepage mockup above) as these were found to be unnecessary and the focus was more put on the upcoming tasks and the helpful study functions. 

Sketches

From these sketches the final layout was coded following the new layout as seen below.

<img src="images\onepage.JPG" width="800px">



### Task List

#### First iteration

From the mock-ups the Task aspects were iterated to show the upcoming tasks and then to have a section to add the tasks. This would help users quickly be able to add their tasks and instead of having two display sections (like in the mockups) the upcoming tasks will display the information of the tasks in a succinct manner all together. 

This was first coded into the layout of the page getting the functionality working then iterated through the CSS. Instead of using a completion status in the function (which was coded then taken out), a delete option was used instead as there was no need to display completed tasks on the webpage as it would just clutter and take up room for upcoming tasks. 

<img src="images\oldtasks.jpg" width="800px">


#### Second iteration

Colors and text following the mockup were then styled into the functions, it followed the light brown background with the darker brown heading. 

<img src="images\taskprogress.JPG" width="800px">


#### Third iteration

Extra stylised aspects were added to the final iteration; including a stylised form and a white text box where the upcoming tasks will be displayed. This provided a clear area for the users to view and a better layout to view the list of tasks. 

<img src="images\Tasks final.JPG" width="800px">



### Kanban board

#### First iteration

From the iterations of the layout the Kanban board was moved to be onto the same page as the other functions however layout stayed pretty similar to the original design so the Kanban board section from the mock-up was followed closely. 

The functionality and layout of the Kanban board was first coded and roughly designed. From the mock-up the functionality changed a bit as instead of users choosing a task and creating to do lists for each task in the Kanban Board, it was changed to the tasks being displayed into the board which users can move between columns. This provides more focus on all the tasks and the progress students are making through all their subjects.

<img src="images\oldkanban.jpg" width="800px">


#### Second iteration

Following the mockup style the CSS was designed for the Kanban board section to have the light brown background with the white sections for the columns. The functionality allows the users to drag and drop the tasks (which pop up from their task list) and sort them in the order they like in the columns. The columns were designed into 3, "To do", "In progress", and "Complete". This allows the users to easily map out their progress and view the required tasks they need to complete. 

<img src="images\kanbanboard1.JPG" width="800px">


#### Third iteration

The board was stylised a bit more to have a gradient between the columns which asserts the columns progression. 

<img src="images\kanban2.JPG" width="800px">


### Timer

#### First iteration

To create the timer a tutorial was followed online at - https://www.youtube.com/watch?v=tREjO_eAPL0, the code was changed to not include the milliseconds and for the timer to just show the hour, minute and seconds as it was thought to not be needed as it will be used to time longer lengths of time for studying than short times. 
The functionality was created and simple CSS was designed for the first iteration;

<img src="images\timer.JPG" width="800px">


#### Second iteration

The CSS was further iterated to follow the mockup design colours. The layout ended up being a bit different from the original mock-up design as icons weren't used but instead buttons for the 3 functions and it just showed the counting up number in the timer.

<img src="images\timer2.jpg" width="800px">


### Dictionary

#### First iteration

The functionality was first coded through javascript, using the API - https://dictionaryapi.dev/ . CSS was not designed so the outcome was just a plain list format. This had a couple of bugs - including too long response and no synonmy values being picked up.

<img src="images\dictionarysearch.JPG" width="385px">


#### Second iteration

The issues were solved in the next iteration, with the synonyms being shown under a new title "Synonyms". 

<img src="images\dictionarysynonym.jpg" width="385px">

The CSS was also further iterated to follow the mockup design colours. 

<img src="images\dictionarycss.jpg" width="385px">


### Music Player

#### First iteration

Using an embedded music player with an mp3 file from; https://pixabay.com/music/search/study/ , the functionality of the music player was created. The layout was slightly different to the mockup as it was placed in a slightly different position under the Kanban Board being more on the left of the screen instead of the full width of the device. 

<img src="images\music1.jpg" width="800px">


#### Second iteration

The CSS for this section was then designed following the mock-up colours, however the audio icons were different as the automatic audio display was used. There was an issue with this iteration as it was coded below the Kanban Board and dictionary section, when the dictionary was used it pushed the music function all the way to the bottom. This was debugged in the final iteration.

<img src="images\issuewithmusicplayer.JPG" width="600px">


#### Third iteration

The music div was moved to be in the same column as the Kanban board so it would stay beneath even when the dictionary function was used. This allowed for a better layout of the website without too much unused white space. 

<img src="images\resolutionmusicplayer.JPG" width="800px">

### Responsive Design

The final step of the project was designing the CSS to be responsive on a mobile phone screen. This was done through the CSS and was modelled to fit a Iphone 12 screen. Most div's were corrected and the design was made so that it would be one continuous column of functions so users could see their upcoming task then scroll to add more or see and edit the Kanban board. Then at the bottom they are able to see the music, timer and the dictionary on the screen which will be handy during a study session were they can leave it open on the screen and utilize all 3 functions.


### Bibiolgraphy

CodingLab. (2021, Oct 12). Create Stopwatch Application in HTML CSS and JavaScript [Video file]. Retrieved from https://www.youtube.com/watch?v=tREjO_eAPL0

Free Dictionary API. (2022). Retrieved 29 May 2022, from https://dictionaryapi.dev/

Creating a Kanban Board with HTML, CSS & JavaScript. (2022). Retrieved 1 June 2022, from https://karthikdevarticles.com/creating-a-kanban-board-with-html-css-and-javascript

FASSounds. (2022, May 31). Lofi Study [Music File]. Retrieved from https://pixabay.com/music/beats-lofi-study-112191/
