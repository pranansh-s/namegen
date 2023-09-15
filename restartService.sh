#!/bin/bash

cd /var/www/namegen
node generateSitemap.js
npm run build
pm2 restart namegen