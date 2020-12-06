clang++ -stdlib=libstdc++ -std=c++11 \
        -L/usr/lib/gcc/x86_64-linux-gnu/5 \
        -I /usr/include/x86_64-linux-gnu/c++/5 \
        -I/usr/include/c++/5 \
        -I/usr/local/include/opencascade \
        -L /usr/local/lib \
        -L /lib64 \
        -l TKSTEP -l TKernel -l TKXSBase -l TKLCAF -l TKXCAF -l TKBrep -l
        TKRWMesh \
        step_to_gltf.cxx -o step_to_gltf
