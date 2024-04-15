# 导入必要的库
import json
import os

#生成元数据json, 用于合约测试，不满足NFT正式发射使用

# 定义一个函数，根据图片的 URL 生成元数据
def generate_metadata(num, image_url):
  # 使用必应图像搜索 API 来获取图片的标题和描述
  # 请替换为您自己的 API 密钥
  # 构造请求 URL
  # 设置请求头
  # 发送请求并获取响应
  # 解析响应为 JSON 格式
  # 获取图片的标题和描述
  # 创建一个字典，包含元数据的字段
  metadata = {
    "name": f"hummingbird-test #" + num,
    "description": "SCWL TEST NFT.",
    "image": f"ipfs://Qmxxxxxx/{image_url}"
  }
  print(metadata)
  # 返回元数据字典
  return metadata



if __name__ == "__main__":
  png_names = []
  # 遍历文件夹下的所有文件
  for file in os.listdir("birds"):
    if file.endswith(".png"):
      png_names.append(file)
  import os

  # 假设你要检测的文件夹路径是folder_path
  folder_path = "metadata"
  # 检测文件夹是否存在
  if not os.path.exists(folder_path):
    # 如果不存在，就创建文件夹
    os.makedirs(folder_path)
    print("文件夹创建成功！")
  else:
    # 如果存在，就打印提示信息
    print("文件夹已经存在！")


  # 遍历图片 URL 列表，为每个图片生成元数据，并保存为 JSON 文件
  for i, image_url in enumerate(png_names):
    i = i + 1
    num = image_url.replace(".png", '')
    # 调用 generate_metadata 函数
    metadata = generate_metadata(num, image_url)
    # 定义 JSON 文件的名称，使用图片的索引作为后缀
    json_file = "metadata/{0}.json".format(int(num))
    # 打开 JSON 文件并写入元数据
    with open(json_file, "w") as f:
      json.dump(metadata, f, indent=4)

