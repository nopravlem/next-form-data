I created a form using NextJS (styled with Material UI) connected to MongoDB.
I deployed using Vercel, so you can access the site [here](https://next-form-data-six.vercel.app/).

## Demo
1. Type in information, submit data, and you'll be redirected

![output-onlinegiftools (1)](https://github.com/user-attachments/assets/54d92eb4-6ec8-4873-9d3a-435ced2564f4)

2. It will be saved in MongoDB

![Screenshot 2024-09-28 at 9 39 04 AM](https://github.com/user-attachments/assets/b976c53f-a473-4ead-8c50-d60c1a32768a)

## Run locally
If you'd like to run this program locally, clone this project and create a `.env.local` file and in `MONGO_DB_URI`:
```bash
MONGO_DB_URI="mongodb+srv://pravtadikonda410:<my_secret_password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
```

Then, run one of these commands:

```bash
npm install
npm run dev
```
OR
```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.