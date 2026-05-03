# Visualization of Space-Filling Curves

A [Space filling curves](https://en.wikipedia.org/wiki/Space-filling_curve) is a curve whose range reaches every point in a higher dimensional region. In other words, a space filling curve is a continuous surjection $f: [0, 1] \to S$ where $S$ is an $n$-dimensional subset of $\mathbb{R}^{n}$ for some integer $n \geq 2$ with positive $n$-dimensional Lebesgue measure. Having a positive Lebesgue measure just means that it "takes up space" in $\mathbb{R}^{n}$, and is not like, say, a straight line in $\mathbb{R}^{2}$ or a smooth surface in $\mathbb{R}^{3}$.

The image below is the Hilbert curve of order 5. Note that, as is evident from the image, this is not actually a space-filling curve. The actual Hilbert curve is what we get if we take the order to tend towards infinity.

![Hilbert Curve](space_filling_curve_imgs/hilbert_order5.png)

In this project, I aim to visualize some of the most famous examples of space-filling curves. I want to show how these curves grow in order recursively, and highlight their self-similarity.