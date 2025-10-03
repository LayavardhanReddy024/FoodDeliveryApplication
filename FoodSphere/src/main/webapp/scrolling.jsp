<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>Image Carousel Demo</title>
    <style>
        .carousel-container {
            position: relative;
            width: 80%;
            margin: auto;
            overflow: hidden;
        }
        .carousel {
            display: flex;
            transition: transform 0.5s ease-in-out;
        }
        .carousel-item {
            min-width: 100%;
            box-sizing: border-box;
        }
        .carousel img {
            width: 100%;
            display: block;
        }
        .arrow {
            position: absolute;
            top: 50%;
            width: 30px;
            height: 30px;
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            cursor: pointer;
            transform: translateY(-50%);
            font-size: 18px;
            text-align: center;
            line-height: 30px;
        }
        .left-arrow {
            left: 10px;
        }
        .right-arrow {
            right: 10px;
        }
    </style>
</head>
<body>
    <h1>Image Carousel</h1>
    <div class="carousel-container">
        <div class="carousel">
            <div class="carousel-item"><img src="https://via.placeholder.com/800x400?text=Image+1" alt="Image 1"></div>
            <div class="carousel-item"><img src="https://via.placeholder.com/800x400?text=Image+2" alt="Image 2"></div>
            <div class="carousel-item"><img src="https://via.placeholder.com/800x400?text=Image+3" alt="Image 3"></div>
        </div>
        <button class="arrow left-arrow">&lt;</button>
        <button class="arrow right-arrow">&gt;</button>
    </div>

    <script src="scroll.js"></script>  
</body>
</html>
