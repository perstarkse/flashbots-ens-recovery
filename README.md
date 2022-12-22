A short tale of recovering my ens from a wallet that is mempool attacked. 

# The mistake: 
It was a dark and stormy night. I had just made some major changes to a project and was feeling pretty proud of myself. The changes involved creating a new repository amongst others.

But little did I know, my wallet was about to be put to the test. As I was working on a project, I accidentally published the private key for my development wallet in a .env file that I pushed to a public repository.

As soon as I realized what I had done, my heart sank. I knew that this was a major security breach and that my funds were at risk. Lo and behold, the wallet was drained of ether... but, the attacker had left the ENS token. 

# The solution: 

All eth sent to the wallet was immidiately drained. So, to my wit, the only solution was bundling my transactions. With some help from the flashbots docs, a way forward presented it self. 

The solution is detailed in main.js, most of which is fairly straight forward. And to get the data for the transaction I used etherscan to generate a transaction, and copied the data hex before cancelling it. I had good use of the flashbotsProvider.simulate() before actually sending the bundle.

# The end:

In the end, great success! I learned a valuable lesson about the importance of keeping my private key safe and secure. I made sure to never make the same mistake again and was grateful to have my ENS token back. 
