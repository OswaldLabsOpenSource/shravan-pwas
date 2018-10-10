cd live-subtitles
echo "Deploying Live Subtitles (1/4)"
yarn deploy
cd ../reader
echo "Deploying Reader (2/4)"
yarn deploy
cd ../visib11y
echo "Deploying Visib11y (3/4)"
yarn deploy
cd ../wikibility
echo "Deploying Wikibility (4/4)"
yarn deploy
cd ../
echo "Deployed all apps"