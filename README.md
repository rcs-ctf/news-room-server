# Mini News Room Server

Broadcast news at ease

## Setup

- nodejs 16+
- npm 8+

## How to Use

To create a new post:-

- step 1: Open `news` folder.
  - step 2: Create a file named `<you-post-name>.txt`
  - step 3: Enter Post Content is following format :-

    ```text
    Date('Dec 11 2023 06:29:27')@
    Stay Tuned for more Updates
    ```

    - Replace date, with post date
    - Make sure `@` is present
    - Start writing context after `@`
  - step 4: Save you file.

## Available Commands

- `read` :- Read all posts on Server
- `edit` :- Edit a post of Server
```Syntax- edit $post_name $post_content```
```Example- edit a.txt Date('Dec 11 2023 06:29:27')@ Your Post Content goes here```

## Installation

### Classic Way

- Clone the Repo
- Start with `npm run start`

### Use Docker

- Run `docker build -t news_app .`
- Run `docker run -v ./news:/app/news -p 3000:3000 news_app`
