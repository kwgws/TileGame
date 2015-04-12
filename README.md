#Tile Demo
This is a prototype of a simple tile-matching game in Unity3D. I had a few goals here: first, I wanted to improve performance and stick closer to best practices by avoiding Find() wherever possible - especially during play. Second, I wanted to have a more logical dependency flow where objects logic was as self-contained as possible and where control was seperate from the models (I.E., a tile knows how to move but not when to move). Finally, since I've been focusing so much on C# lately, I thought I would have a go at Unity3D's version of JavaScript. It's a little odd - they've lost a lot of JavaScript's fluidity in adapting it to their engine - but at least it's something new.