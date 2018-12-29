# git flow 工作流简化操作

 ** 此仓库尚在内部测试阶段，请谨慎使用 **
 git flow 是一种有效的分支管理方式，本仓库针对主流 git flow 工作，稍微修改，定制了一套自己的git操作工作流和简化的api
 
# 安装

```
  npm install -g @asman/fl
```

or

```
  yarn add -g @asman/fl
```

## 分支说明

### master

主分支，受保护，不可直接操作提交

### develop 分支

开发分支

### feature 分支

每个 feature 分支从 develop 检出, 开发完成合并进 develop 分支, 并自删除

### hotfix 分支

用线上版本热修复，从 master 检出，开发完成后合并进 develop 分支和 master 分支, 并打 tag

### release 分支

发布分支，用于测试阶段，从 develop 分支检出，启动后进入测试阶段，锁定分支，独立开发，进行bugfixed, 完成后合并进 develop 分支和 master 分支, 并打 tag

## 命令说明

```
  fl -i  // git flow init 
```
git flow 环境初始化, 会创建 master 分支 和 develop 分支并 `push -u` 到远程源

```
  fl -f xxx // git flow feature start xxx
```

创建 feature 分支， 分支名为 `feature/xxx`, 并 `push -u` 到远程源

```
  fl -r // git flow feature start <version> 
```

根据 `pakcage.json` 中的 version 字段创建 release 分支， 分支名如 `feature/1.0.2`, 并 `push -u` 到远程源

```
  fl --hotfix // git flow feature start <patchVersion> 
```

从 master 创建 hotfix 分支， 分支名根据 master分支 package.json的version和当前时间戳生成，如 `hotfix/1.0.2-patch-1546055248487`, 同时同步修改`package.json`中的version字段, 并 `push -u` 到远程源

```
  fl --finish // git flow <type> finish xxx 
```

根据当前分支判断进行特定分支 finish 行为:

1. 如果是 feature 分支: 会合并到develop, 并同时删除本地和远程分支, 切换回develop分支
2. 如果是 release 分支: 会合并到develop 和 master, 打上`version` 的tag, 并同时删除本地和远程分支, 切换回master分支
3. 如果是 hotfix 分支: 会合并到develop 和 master 分支, 打上`patchVersion`的tag, 并同时删除本地和远程分支, 切换回 master分支

# TODOS

* publish命令
* 测试用例编写
* 统一异常处理
* develop 和 master 分支的自动同步检测
