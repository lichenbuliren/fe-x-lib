import fs from 'fs/promises';
import path from 'path';

/**
 * 确保正则表达式包含全局标志 `g`
 * @param regex - 原始正则表达式
 * @returns 包含全局标志的正则表达式
 */
function ensureGlobalRegex(regex: RegExp): RegExp {
  if (!regex.flags.includes('g')) {
    return new RegExp(regex.source, `${regex.flags}g`); // 动态添加 `g` 标志
  }
  return regex;
}

/**
 * 提取 import {} 中的内容为数组
 * @param code - 包含 import 语句的代码字符串
 * @param regex - 正则表达式，用于匹配 import 语句
 * @returns string[] - 返回解析出的内容数组，如果没有匹配到，则返回空数组
 */
function extractImportContents(code: string, regex: RegExp): string[] {
  const gloablRegex = ensureGlobalRegex(regex); // 确保正则包含全局标志
  const matches = Array.from(code.matchAll(gloablRegex)); // 使用 matchAll 支持全局匹配
  return matches
    .map((match) => match[1])
    .flatMap((content) => content.split(',').map((item) => item.trim())) // 解析并去掉多余空格
    .filter(Boolean); // 去除空值
}

/**
 * 递归扫描目录下的所有文件，支持排除指定目录
 * @param dir - 目录路径
 * @param exclude - 需要排除的目录名称列表
 * @returns Promise<string[]> - 返回所有文件路径
 */
async function getAllFiles(dir: string, exclude: string[] = []): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const filePath = path.join(dir, entry.name);
      if (entry.isDirectory() && !exclude.some((excludedDir) => filePath.includes(excludedDir))) {
        return getAllFiles(filePath, exclude); // 递归处理子目录
      }

      if (entry.isFile() && (filePath.endsWith('.js') || filePath.endsWith('.ts'))) {
        return filePath; // 只保留 .js 和 .ts 文件
      }
      return [];
    }),
  );
  return files.flat();
}

/**
 * 主逻辑：扫描项目中的 import 内容并输出到指定文件
 * @param startPath - 扫描起始路径
 * @param exclude - 要排除的目录名称列表
 * @param regex - 正则表达式，用于匹配 import 语句
 * @param outputPath - 输出文件路径
 */
async function main({
  startPath,
  exclude = [],
  regex,
  outputPath,
}: {
  startPath: string;
  exclude: string[];
  regex: RegExp;
  outputPath: string;
}) {
  console.log('开始扫描项目文件...');
  console.log(`扫描路径: ${startPath}`);
  console.log(`排除目录: ${exclude.join(', ')}`);
  console.log(`匹配正则: ${regex}`);
  console.log(`输出路径: ${outputPath}`);

  try {
    const allFiles = await getAllFiles(startPath, exclude);
    const importsSet = new Set<string>();

    // 并行读取和处理文件内容
    await Promise.all(
      allFiles.map(async (file) => {
        const fileContent = await fs.readFile(file, 'utf-8');
        const imports = extractImportContents(fileContent, regex);
        imports.forEach((item) => importsSet.add(item)); // 去重
      }),
    );

    // 转换为数组并写入指定输出文件
    const result = Array.from(importsSet);
    await fs.writeFile(outputPath, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`提取完成，结果已保存到 ${outputPath}`);
  } catch (error) {
    console.error(`处理失败: ${(error as Error).message}`);
  }
}

// 从命令行获取参数
const args = process.argv.slice(2); // 跳过前两个参数：node 和脚本名
const options = args.reduce<{ path?: string; exclude?: string[]; regex?: string; output?: string }>((acc, arg) => {
  if (arg.startsWith('--path=')) {
    acc.path = arg.replace('--path=', '');
  } else if (arg.startsWith('--exclude=')) {
    acc.exclude = arg
      .replace('--exclude=', '')
      .split(',')
      .map((item) => item.trim());
  } else if (arg.startsWith('--regex=')) {
    acc.regex = arg.replace('--regex=', '');
  } else if (arg.startsWith('--output=')) {
    acc.output = arg.replace('--output=', '');
  }
  return acc;
}, {});

// 设置默认值并执行脚本
main({
  startPath: options.path || process.cwd(),
  exclude: options.exclude || ['node_modules', 'dist', 'build'],
  regex: new RegExp(options.regex || `import\\s+\\{([^}]+)\\}\\s+from\\s+['"][^'"]+['"]`),
  outputPath: options.output || path.join(process.cwd(), 'result.json'),
}).catch((err) => console.error(`脚本执行失败: ${err.message}`));
