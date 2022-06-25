#!/bin/fish

echo ------------

for i in (seq 10)
    echo "Iteracion $i"
    node tokens.js
    echo ------------
end
