# 📒 A little Contact book project

I'm making this as I go about learning React and Express for building webapps.
[Deployed on Render](https://contactbook-o7uy.onrender.com)

(It might take a while to start as Render shuts off the server on downtime)

---

If you want to run it on dev server, run these commands in the root directory (assuming you have npm installed):

```
npm install
npm run dev
```
The frontend_code directory will have to be built to a production build for the changes to take effect in the dev server.

Simply use ``npm run build`` in the frontend directory, which should output a folder called dist, then transfer this folder to the outer directory.

---

So far this only works with one database, which means that there is a shared pool of public contacts. I plan on adding authentication to it as soon as I figure out how to do so. 
